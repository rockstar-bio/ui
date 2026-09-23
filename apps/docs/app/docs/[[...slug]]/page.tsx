
import { notFound } from "next/navigation"
import {
  DocsPage,
  DocsBody,
  MarkdownCopyButton,
  ViewOptionsPopover,
} from "fumadocs-ui/layouts/glass/page"
import { ButtonGroup, ButtonGroupSeparator, buttonVariants } from "rockin/ui"
import { getMDXComponents } from "@/mdx-components"
import { getDocPage, source } from "@/lib/source"
import { PageActions } from "./ui/actions"

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>
}) {
  const params = await props.params
  const page = getDocPage(params.slug)
  if (!page) notFound()

  const MDX = page.data.body

  const markdownUrl = `/api/mdx/${page.slugs.join("/")}`
  const githubUrl = `https://github.com/rockstar-bio/ui/blob/main/apps/docs/content/docs/${page.path}`

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsBody>
        <div className="flex items-center justify-between">
          <h1 className="mb-0!">{page.data.title}</h1>
        <PageActions  markdownUrl={markdownUrl} githubUrl={githubUrl} />
        </div>

        <p className="text-fd-muted-foreground text-lg">
          {page.data.description}
        </p>
        <MDX components={getMDXComponents()} />
      </DocsBody>
    </DocsPage>
  )
}

export async function generateStaticParams() {
  return source.generateParams()
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>
}) {
  const params = await props.params
  const page = getDocPage(params.slug)
  if (!page) notFound()

  return {
    title: page.data.title,
    description: page.data.description,
  }
}
