import { defineConfig, defineDocs } from "fumadocs-mdx/config"

export const { docs, meta } = defineDocs({
  docs: {
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
})

export default defineConfig({})
