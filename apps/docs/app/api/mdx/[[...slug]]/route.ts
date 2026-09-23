import { getLLMText } from "@/lib/llm"
import { source } from "@/lib/source"

export const dynamic = "force-static"

export async function GET(_req: Request, { params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params
  const page = source.getPage(slug)
  if (!page) return new Response("Not found", { status: 404 })

  return new Response(await getLLMText(page), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  })
}

export function generateStaticParams() {
  // Skip the root page: with `output: export` its file would collide with
  // the nested directories the other markdown files need.
  return source
    .generateParams()
    .map((params) => ({ slug: params.slug ?? [] }))
    .filter((params) => params.slug.length > 0)
}
