import { File, Files, Folder } from "fumadocs-ui/components/files"
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock"

/**
 * "Anatomy" section of a component page: import source + composition tree.
 *
 * Usage in MDX:
 *   <Anatomy
 *     importCode={`import { Card, CardContent } from "rockin/ui"`}
 *     parts={["Card", "CardHeader", "CardContent", "CardFooter"]}
 *   />
 */
export function Anatomy({
  importCode,
  parts,
  sourcePath,
}: {
  /** Import statement shown as code */
  importCode: string
  /** Composition parts, rendered as a tree (first item is the root) */
  parts: string[]
  /** Where the component lives in the package, e.g. ui/card.tsx */
  sourcePath?: string
}) {
  return (
    <div className="not-prose flex flex-col gap-4">
      <DynamicCodeBlock lang="tsx" code={importCode} />
      {parts.length > 0 ? (
        <Files>
          <Folder name={sourcePath ?? "component"} defaultOpen>
            <File name={`${parts[0]}`} />
            {parts.slice(1).map((part) => (
              <File key={part} name={part} />
            ))}
          </Folder>
        </Files>
      ) : null}
    </div>
  )
}
