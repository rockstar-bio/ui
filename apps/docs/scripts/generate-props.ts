/**
 * Extracts component prop metadata from packages/ui source using the
 * TypeScript compiler and writes lib/props.generated.json.
 *
 * Run: bun scripts/generate-props.ts
 */
import * as fs from "node:fs"
import * as path from "node:path"
import ts from "typescript"

const REPO_ROOT = path.resolve(import.meta.dir, "../../..")
const UI_SRC = path.join(REPO_ROOT, "packages/ui/src")
const OUT_FILE = path.join(import.meta.dir, "../lib/props.generated.json")

const TARGET_FILES = [
  ...fs
    .readdirSync(path.join(UI_SRC, "ui"))
    .filter((f) => f.endsWith(".tsx"))
    .map((f) => path.join(UI_SRC, "ui", f)),
  path.join(UI_SRC, "ui/apple/index.tsx"),
  path.join(UI_SRC, "ui/farmer/div.tsx"),
  path.join(UI_SRC, "ui/reui/filters.tsx"),
]

const configFile = ts.findConfigFile(UI_SRC, ts.sys.fileExists)
const config = configFile
  ? ts.parseJsonConfigFileContent(ts.readConfigFile(configFile, ts.sys.readFile).config, ts.sys, path.dirname(configFile))
  : undefined

const program = ts.createProgram({
  rootNames: [...new Set([...(config?.fileNames ?? []), ...TARGET_FILES])],
  options: {
    ...(config?.options ?? {}),
    noEmit: true,
    skipLibCheck: true,
  },
})

const checker = program.getTypeChecker()

interface PropInfo {
  name: string
  type: string
  required: boolean
  default?: string
  description?: string
}

interface ComponentInfo {
  name: string
  file: string
  props: PropInfo[]
  all: PropInfo[]
  inherits?: string
  description?: string
}

function cleanType(type: string): string {
  return type
    .replace(/\s+/g, " ")
    .replace(/\s*\|\s*undefined\b/g, "")
    .trim()
}

function shortType(type: string, max = 140): string {
  const t = cleanType(type)
  if (t.length <= max) return t
  const cut = t.slice(0, max)
  const lastSep = Math.max(cut.lastIndexOf("|"), cut.lastIndexOf(","), cut.lastIndexOf(">"))
  return (lastSep > 40 ? cut.slice(0, lastSep) : cut).trim() + " …"
}

function jsdocOf(symbol: ts.Symbol | undefined): string | undefined {
  if (!symbol || typeof symbol.getDocumentationComment !== "function") return undefined
  const doc = symbol.getDocumentationComment(checker)
  const text = doc.map((d) => d.text).join("").trim()
  if (!text) return undefined
  return text.split("\n").map((l) => l.trim()).join(" ").slice(0, 300)
}

/** Extract custom props (with defaults) from a destructured parameter. */
function customPropsFromPattern(pattern: ts.BindingPattern): PropInfo[] {
  if (!ts.isObjectBindingPattern(pattern)) return []
  const props: PropInfo[] = []
  for (const el of pattern.elements) {
    if (ts.isOmittedExpression(el)) continue
    const name = el.propertyName ? (el.propertyName as ts.Identifier).text : (el.name as ts.Identifier).text
    if (name === "className" || name === "props" || ts.isObjectBindingPattern(el.name)) continue
    const prop: PropInfo = { name, type: "unknown", required: !el.questionToken && el.initializer === undefined }
    if (el.initializer) {
      prop.default = el.initializer.getText().replace(/\s+/g, " ")
      prop.required = false
    }
    props.push(prop)
  }
  return props
}

/** Enrich custom props with real types via checker. */
function enrichWithTypes(props: PropInfo[], paramType: ts.Type): PropInfo[] {
  return props.map((p) => {
    const sym = paramType.getProperty(p.name)
    if (sym) {
      const t = checker.getTypeOfSymbolAtLocation(sym, sym.valueDeclaration ?? program.getSourceFiles()[0]!)
      p.type = shortType(checker.typeToString(t, undefined, ts.TypeFormatFlags.NoTruncation | ts.TypeFormatFlags.UseTypeOfFunction), 110)
      const doc = jsdocOf(sym)
      if (doc) p.description = doc
      if (p.default === undefined && sym.valueDeclaration && ts.isParameter(sym.valueDeclaration)) {
        // no default extracted
      }
    }
    return p
  })
}

/** Collect names exported by this file: `export { A, B }`, `export function A`, `export const A`, `export default`. */
function collectExportedNames(sourceFile: ts.SourceFile): Set<string> {
  const names = new Set<string>()
  sourceFile.forEachChild((node) => {
    if (ts.isExportDeclaration(node) && node.exportClause && ts.isNamedExports(node.exportClause)) {
      for (const el of node.exportClause.elements) names.add((el.name as ts.Identifier).text)
    } else if (ts.isFunctionDeclaration(node) && node.name && node.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)) {
      names.add(node.name.text)
    } else if (ts.isVariableStatement(node) && node.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)) {
      for (const d of node.declarationList.declarations) {
        if (ts.isIdentifier(d.name)) names.add(d.name.text)
      }
    }
  })
  return names
}

function extractComponent(sourceFile: ts.SourceFile, node: ts.Node): ComponentInfo | null {
  let name: string | undefined
  let paramNode: ts.ParameterDeclaration | undefined

  if (ts.isFunctionDeclaration(node) && node.name) {
    name = node.name.text
    paramNode = node.parameters[0]
  } else if (ts.isVariableStatement(node)) {
    const decl = node.declarationList.declarations[0]
    if (!decl || !ts.isIdentifier(decl.name) || !decl.initializer) return null
    name = decl.name.text
    if (ts.isArrowFunction(decl.initializer) || ts.isFunctionExpression(decl.initializer)) {
      paramNode = decl.initializer.parameters[0]
    }
  } else if (ts.isClassDeclaration(node) && node.name) {
    name = node.name.text
  }
  if (!name || !paramNode) return null
  if (!ts.isObjectBindingPattern(paramNode.name) && !ts.isIdentifier(paramNode.name)) return null
  // skip non-component helpers (must start uppercase)
  if (!/^[A-Z]/.test(name)) return null
  // must be exported
  if (!exportedNamesCache.get(sourceFile)?.has(name)) return null

  const paramType = checker.getTypeAtLocation(paramNode)
  const props: PropInfo[] = customPropsFromPattern(paramNode.name).filter((p) => p.name !== "children")

  // children is valid; keep it but mark
  const childrenSym = paramType.getProperty("children")

  const enriched = enrichWithTypes(props, paramType)
  if (childrenSym && !props.some((p) => p.name === "children")) {
    const t = checker.getTypeOfSymbolAtLocation(childrenSym, paramNode)
    enriched.unshift({
      name: "children",
      type: shortType(checker.typeToString(t, undefined, ts.TypeFormatFlags.NoTruncation), 60),
      required: !childrenSym.declarations?.some((d) => ts.isPropertySignature(d) && d.questionToken),
    })
  }

  // full inherited surface
  const apparent = checker.getApparentType(paramType)
  const all: PropInfo[] = []
  for (const sym of apparent.getProperties()) {
    if (["key", "ref", "style", "className", "children"].includes(sym.name)) continue
    const t = checker.getTypeOfSymbolAtLocation(sym, paramNode)
    const typeStr = checker.typeToString(t, undefined, ts.TypeFormatFlags.NoTruncation)
    if (typeStr.length > 160) continue
    all.push({ name: sym.name, type: shortType(typeStr), required: !(sym.flags & ts.SymbolFlags.Optional) })
  }

  const inherits = cleanType(paramNode.type?.getText(sourceFile) ?? "")
    .replace(/VariantProps<typeof \w+>\s*&\s*/, "")
    .replace(/&\s*VariantProps<typeof \w+>/, "")
    .slice(0, 120)

  return {
    name,
    file: path.relative(UI_SRC, sourceFile.fileName).replace(/\\/g, "/"),
    props: enriched,
    all,
    inherits: inherits || undefined,
    description: jsdocOf(checker.getSymbolAtLocation(
      ts.isFunctionDeclaration(node) && node.name ? node.name : (paramNode.name as ts.Identifier)
    )) ?? undefined,
  }
}

const exportedNamesCache = new Map<ts.SourceFile, Set<string>>()

const result: Record<string, Record<string, ComponentInfo>> = {}

for (const file of TARGET_FILES) {
  const sourceFile = program.getSourceFile(file)
  if (!sourceFile) {
    console.warn(`skip (unresolvable): ${file}`)
    continue
  }
  exportedNamesCache.set(sourceFile, collectExportedNames(sourceFile))
  const relKey = path.relative(UI_SRC, file).replace(/\\/g, "/").replace(/\.tsx?$/, "")
  // "ui/button" -> "button", "ui/farmer/div" -> "farmer/div", "hooks/useMounted" -> "hooks", "icon/loader" -> "icon"
  let groupKey: string
  if (relKey.startsWith("ui/")) {
    groupKey = relKey.slice(3)
    if (groupKey.endsWith("/index")) groupKey = groupKey.slice(0, -6)
    if (!groupKey.includes("/")) groupKey = groupKey
  } else {
    groupKey = relKey.split("/")[0]
  }
  void groupKey

  const components: Record<string, ComponentInfo> = {}
  sourceFile.forEachChild((node) => {
    const info = extractComponent(sourceFile, node)
    if (info) components[info.name] = info
  })

  if (Object.keys(components).length > 0) {
    result[groupKey] = { ...(result[groupKey] ?? {}), ...components }
  }
}

fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true })
fs.writeFileSync(OUT_FILE, JSON.stringify(result, null, 2))

const total = Object.values(result).reduce((n, g) => n + Object.keys(g).length, 0)
console.log(`Wrote ${total} components across ${Object.keys(result).length} groups -> ${path.relative(REPO_ROOT, OUT_FILE)}`)
