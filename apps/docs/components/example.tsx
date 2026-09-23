"use client"

import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock"
import { demos, type DemoName } from "@/components/previews"
import { previewCode } from "@/lib/preview-code.generated"

/**
 * A titled example section with a live demo and collapsible code.
 *
 * Usage in MDX:
 *   <ComponentExample name="button-variants" title="Variants" description="..." />
 *
 * Or with inline children + code:
 *   <ComponentExample title="..." code={'<Button>x</Button>'}>...</ComponentExample>
 */
export function ComponentExample({
  name,
  title,
  description,
  code,
  children,
  defaultOpen = false,
}: {
  name?: DemoName
  title?: string
  description?: string
  code?: string
  children?: React.ReactNode
  defaultOpen?: boolean
}) {
  const Demo = name ? demos[name] : undefined
  const source = code ?? (name ? previewCode[name] : undefined)

  return (
    <section className="not-prose mt-6 mb-10">
      {title ? <h3 className="text-lg font-semibold text-fd-foreground">{title}</h3> : null}
      {description ? <p className="mt-1 mb-3 text-sm text-fd-muted-foreground">{description}</p> : null}
      <div className="overflow-hidden rounded-xl border border-fd-border">
        <div className="docs-preview flex min-h-36 items-center justify-center bg-fd-background p-6 sm:p-8">
          {Demo ? <Demo /> : children}
        </div>
        {source ? (
          <details open={defaultOpen} className="group border-t border-fd-border">
            <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-2.5 text-sm font-medium text-fd-muted-foreground select-none hover:text-fd-foreground [&::-webkit-details-marker]:hidden">
              Show code
              <span className="transition-transform group-open:rotate-180">▾</span>
            </summary>
            <div className="border-t border-fd-border/60 [&_figure]:rounded-none! [&_figure]:border-0!">
              <DynamicCodeBlock lang="tsx" code={source} />
            </div>
          </details>
        ) : null}
      </div>
    </section>
  )
}
