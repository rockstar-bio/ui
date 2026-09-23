"use client"

import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock"
import { Tab, Tabs } from "fumadocs-ui/components/tabs"
import { demos, type DemoName } from "@/components/previews"
import { previewCode } from "@/lib/preview-code.generated"

/**
 * Live component preview with Preview / Code tabs.
 *
 * Usage in MDX: <ComponentPreview name="button-basic" />
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

  if (!Demo) {
    return (
      <div className="rounded-lg border border-fd-destructive/40 bg-fd-destructive/10 p-4 text-sm text-fd-destructive">
        Unknown preview: <code>{name}</code>
      </div>
    )
  }

  return (
    <Tabs
      items={["Preview", "Code"]}
      className="not-prose mt-0!"
    >
      <Tab value="Preview">
        <div
          className={`docs-preview flex min-h-44 w-full items-center justify-center rounded-b-lg border border-t-0 border-fd-border bg-fd-background p-6 sm:p-10 ${
            align === "start" ? "justify-start" : ""
          } ${className ?? ""}`}
        >
          <Demo />
        </div>
      </Tab>
      <Tab value="Code">
        <div className="overflow-hidden rounded-b-lg border border-t-0 border-fd-border [&_figure]:rounded-none! [&_figure]:border-0!">
          <DynamicCodeBlock lang="tsx" code={code ?? ""} />
        </div>
      </Tab>
    </Tabs>
  )
}
