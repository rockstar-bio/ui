"use client"

import { Copy, RotateCcw } from "lucide-react"
import { useState } from "react"
import {
  LiveEditor,
  LiveError,
  LivePreview,
  LiveProvider,
} from "react-live"
import * as React from "react"
import * as Icons from "lucide-react"
import { gooeyToast } from "rockin"
import { BellIcon, IconSwap } from "rockin/icon"
import * as RockinUI from "rockin/ui"

import { demos, type DemoName } from "@/components/previews"
import { previewCode, previewSupportCode } from "@/lib/preview-code.generated"

const withoutDefault = <T extends Record<string, unknown>>(module: T) => {
  const { default: _default, ...namedExports } = module
  return namedExports
}

const liveScope = {
  React,
  ...withoutDefault(React),
  ...withoutDefault(RockinUI),
  ...withoutDefault(Icons),
  BellIcon,
  IconSwap,
  toast: gooeyToast,
}

const codeTheme = {
  plain: {
    color: "var(--docs-code-text)",
    backgroundColor: "var(--docs-code-bg)",
  },
  styles: [
    { types: ["comment", "prolog", "doctype"], style: { color: "var(--docs-code-muted)" } },
    { types: ["keyword", "operator", "atrule"], style: { color: "var(--docs-code-keyword)" } },
    { types: ["function", "class-name"], style: { color: "var(--docs-code-function)" } },
    { types: ["tag"], style: { color: "var(--docs-code-property)" } },
    { types: ["string", "char", "attr-value"], style: { color: "var(--docs-code-string)" } },
    { types: ["punctuation", "plain"], style: { color: "var(--docs-code-text)" } },
    { types: ["number", "boolean", "constant", "builtin"], style: { color: "var(--docs-code-number)" } },
    { types: ["attr-name", "property", "variable"], style: { color: "var(--docs-code-property)" } },
  ],
}

function toLiveCode(code: string, supportCode: string, name: DemoName) {
  const demoFunction = code.match(/function\s+(\w+Demo)\s*\(/)?.[1]
  const withoutImports = code
    .replace(/import[\s\S]*?from\s+["'][^"']+["']\s*/g, "")
    .replace(/export\s+function/g, "function")
  const support = supportCode
    .replace(/export\s+function/g, "function")

  const componentName = demoFunction ?? `${name.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())}Demo`
  return `${support}\n${withoutImports}\nrender(<${componentName} />)`
}

/**
 * Live component preview with an editable, syntax-highlighted Preview / Code card.
 * Imports and the demo export are transformed into a safe in-page scope; arbitrary
 * JavaScript is never evaluated outside the React Live sandbox.
 */
export function ComponentPreview({
  name,
  align = "center",
  className,
}: {
  name: DemoName
  align?: "center" | "start"
  className?: string
}) {
  const Demo = demos[name]
  const code = previewCode[name]
  const [tab, setTab] = useState<"Preview" | "Code">("Preview")
  const [editedCode, setEditedCode] = useState(code ?? "")

  if (!Demo) {
    return (
      <div className="rounded-lg border border-fd-destructive/40 bg-fd-destructive/10 p-4 text-sm text-fd-destructive">
        Unknown preview: <code>{name}</code>
      </div>
    )
  }

  return (
    <LiveProvider
      code={editedCode}
      language="tsx"
      enableTypeScript
      noInline
      theme={codeTheme}
      scope={liveScope}
      transformCode={(source) => toLiveCode(source, previewSupportCode[name] ?? "", name)}
    >
      <div className="not-prose mt-0 overflow-hidden rounded-2xl border border-fd-border bg-fd-background shadow-sm">
        <div className="flex items-center gap-1 border-b border-fd-border bg-fd-muted/30 px-3 pt-2">
          {(["Preview", "Code"] as const).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setTab(item)}
              className={`rounded-t-lg border border-b-0 px-4 py-2 text-sm font-medium transition-colors ${
                tab === item
                  ? "border-fd-border bg-fd-background text-fd-foreground"
                  : "border-transparent text-fd-muted-foreground hover:text-fd-foreground"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {tab === "Preview" ? (
          <div
            className={`flex min-h-52 w-full items-center justify-center bg-fd-background p-6 sm:p-10 ${
              align === "start" ? "justify-start" : ""
            } ${className ?? ""}`}
          >
            <LivePreview />
          </div>
        ) : (
          <div className="bg-fd-muted/10 p-3 sm:p-4">
            <div className="docs-code-surface relative overflow-hidden rounded-xl border text-[15px] leading-7">
              <button
                type="button"
                aria-label="Copy code"
                onClick={() => navigator.clipboard?.writeText(editedCode)}
                className="docs-code-copy absolute right-3 top-3 z-10 rounded-md p-1.5 transition-colors"
              >
                <Copy className="size-5" />
              </button>
              <LiveEditor
                language="tsx"
                tabMode="indentation"
                className="docs-code-editor min-h-64 font-mono [&_pre]:pr-16"
                onChange={setEditedCode}
              />
            </div>
            <LiveError className="mt-2 block rounded-lg border border-fd-destructive/30 bg-fd-destructive/10 px-3 py-2 font-mono text-xs text-fd-destructive" />
            <div className="mt-3 flex items-center justify-between gap-3 text-xs text-fd-muted-foreground">
              <span>Changes update the preview live.</span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setEditedCode(code ?? "")}
                  className="inline-flex items-center gap-1 rounded-md px-2 py-1.5 hover:bg-fd-muted hover:text-fd-foreground"
                >
                  <RotateCcw className="size-3.5" /> Reset
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </LiveProvider>
  )
}
