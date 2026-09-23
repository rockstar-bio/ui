import { loader } from "fumadocs-core/source"
import { statusBadgesPlugin } from "fumadocs-core/source/status-badges"
import type { InferPageType } from "fumadocs-core/source"
import type { DocData } from "fumadocs-mdx/runtime/types"
import { toFumadocsSource } from "fumadocs-mdx/runtime/server"
import { docs, meta } from "@/.source/server"

export const source = loader({
  baseUrl: "/docs",
  plugins: [statusBadgesPlugin()],
  source: toFumadocsSource(docs, meta),
})

/**
 * Fumadocs' loader generic loses the fumadocs-mdx page data through
 * inference, so we re-type it here.
 */
export type DocPageData = DocData & {
  title: string
  description?: string
  full?: boolean
  component?: string
  source?: string
  deps?: string[]
}

export type DocPage = InferPageType<typeof source> & { data: DocPageData }

export function getDocPage(slug?: string[]): DocPage | undefined {
  const page = source.getPage(slug)
  return page ? (page as DocPage) : undefined
}
