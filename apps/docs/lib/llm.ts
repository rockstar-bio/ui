import type { InferPageType } from "fumadocs-core/source"
import { source } from "@/lib/source"

export async function getLLMText(page: InferPageType<typeof source>) {
  const getText = (page.data as unknown as { getText?: (type: string) => Promise<string> }).getText
  const processed = getText ? await getText("processed") : ""

  return `# ${page.data.title}
URL: ${page.url}
${page.data.description ?? ""}

${processed}`
}
