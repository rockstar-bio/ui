import { notFound } from "next/navigation"
import { DocsPage, DocsBody, MarkdownCopyButton, ViewOptionsPopover } from "fumadocs-ui/layouts/glass/page"
import { getMDXComponents } from "@/mdx-components"
import { getDocPage, source } from "@/lib/source"

export default async function Page(props: { params: Promise<{ slug?: string[] }> }) {
  const params = await props.params
  const page = getDocPage(params.slug)
  if (!page) notFound()

  const MDX = page.data.body

  const markdownUrl = `/api/mdx/${page.slugs.join("/")}`
  const githubUrl = `https://github.com/rockstar-bio/ui/blob/main/apps/docs/content/docs/${page.path}`

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <div className="not-prose mb-4 flex items-center justify-end gap-1.5">
        <MarkdownCopyButton markdownUrl={markdownUrl} />
        <ViewOptionsPopover markdownUrl={markdownUrl} githubUrl={githubUrl} />
      </div>
      <DocsBody>
        <h1 className="mb-2">{page.data.title}</h1>
        <p className="mb-8 text-lg text-fd-muted-foreground">{page.data.description}</p>
        <MDX components={getMDXComponents()} />
      </DocsBody>
    </DocsPage>
  )
}

export async function generateStaticParams() {
  return source.generateParams()
}

export async function generateMetadata(props: { params: Promise<{ slug?: string[] }> }) {
  const params = await props.params
  const page = getDocPage(params.slug)
  if (!page) notFound()

  return {
    title: page.data.title,
    description: page.data.description,
  }
}
