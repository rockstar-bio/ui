import generatedProps from "@/lib/props.generated.json"

export interface PropRow {
  name: string
  type: string
  required?: boolean
  default?: string
  description?: string
}

export interface ManualProp {
  name: string
  type: string
  default?: string
  description?: string
}

type GeneratedComponent = { props: PropRow[]; all: PropRow[]; inherits?: string }

const generated = generatedProps as Record<string, Record<string, GeneratedComponent>>

function findComponent(name: string): GeneratedComponent | undefined {
  for (const group of Object.values(generated)) {
    if (group[name]) return group[name]
  }
  return undefined
}

function PropRows({ rows, withDefault = true }: { rows: (PropRow | ManualProp)[]; withDefault?: boolean }) {
  return (
    <tbody>
      {rows.map((row) => (
        <tr key={row.name} className="border-b border-fd-border last:border-0">
          <td className="p-2 align-top whitespace-nowrap">
            <code className="rounded-md bg-fd-muted px-1.5 py-0.5 text-[0.8rem] font-medium text-fd-primary">
              {row.name}
              {"required" in row && row.required ? <span className="text-fd-destructive">*</span> : null}
            </code>
          </td>
          <td className="max-w-90 p-2 align-top">
            <code className="text-[0.78rem] break-words text-fd-muted-foreground">{row.type}</code>
          </td>
          {withDefault ? (
            <td className="p-2 align-top">
              {"default" in row && row.default !== undefined ? (
                <code className="text-[0.78rem] text-fd-muted-foreground">{row.default}</code>
              ) : (
                <span className="text-[0.78rem] text-fd-muted-foreground/60">—</span>
              )}
            </td>
          ) : null}
          <td className="p-2 align-top text-sm text-fd-muted-foreground">
            {row.description ?? <span className="opacity-50">—</span>}
          </td>
        </tr>
      ))}
    </tbody>
  )
}

function PropTable({
  rows,
  withDefault = true,
}: {
  rows: (PropRow | ManualProp)[]
  withDefault?: boolean
}) {
  return (
    <div className="not-prose overflow-x-auto rounded-lg border border-fd-border">
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-fd-border bg-fd-muted/50">
            <th className="w-36 p-2 font-medium">Prop</th>
            <th className="p-2 font-medium">Type</th>
            {withDefault ? <th className="w-28 p-2 font-medium">Default</th> : null}
            <th className="p-2 font-medium">Description</th>
          </tr>
        </thead>
        <PropRows rows={rows} withDefault={withDefault} />
      </table>
    </div>
  )
}

/**
 * Renders the API table for a component from generated prop data
 * (`bun run props` regenerates lib/props.generated.json).
 *
 * Usage in MDX:
 *   <PropsTable component="Button" />
 *   <PropsTable props={[{ name: "query", type: "string", description: "..." }]} />
 */
export function PropsTable({
  component,
  props,
  showAll = true,
}: {
  /** Component name keying into lib/props.generated.json */
  component?: string
  /** Inline prop rows (for hooks/icons and hand-written entries) */
  props?: ManualProp[]
  /** Show the collapsed "full props surface" section (default true) */
  showAll?: boolean
}) {
  const data = component ? findComponent(component) : undefined

  if (!data && !props) {
    return (
      <div className="not-prose my-4 rounded-lg border border-fd-destructive/40 bg-fd-destructive/10 p-4 text-sm text-fd-destructive">
        No props data found for <code>{component}</code>. Run <code>bun run props</code> to regenerate.
      </div>
    )
  }

  return (
    <div className="not-prose flex flex-col gap-4">
      {props ? <PropTable rows={props} /> : null}
      {data ? (
        <>
          <PropTable rows={data.props} />
          {data.inherits ? (
            <p className="text-sm text-fd-muted-foreground">
              Also forwards all props of{" "}
              <code className="rounded bg-fd-muted px-1 py-0.5 text-[0.78rem]">{data.inherits}</code> to the rendered
              element.
            </p>
          ) : null}
        </>
      ) : null}
      {showAll && data && data.all.length > 0 ? (
        <details className="group rounded-lg border border-fd-border open:pb-2">
          <summary className="cursor-pointer list-none p-3 text-sm font-medium text-fd-muted-foreground select-none hover:text-fd-foreground [&::-webkit-details-marker]:hidden">
            <span className="inline-flex items-center gap-2">
              <span className="transition-transform group-open:rotate-90">▸</span>
              Full props surface ({data.all.length})
            </span>
          </summary>
          <div className="px-3 pb-1">
            <PropTable rows={data.all} withDefault={false} />
          </div>
        </details>
      ) : null}
    </div>
  )
}
