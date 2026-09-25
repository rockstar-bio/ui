import { defineConfig, defineDocs } from "fumadocs-mdx/config"
import { pageSchema } from "fumadocs-core/source/schema"

export const { docs, meta } = defineDocs({
  docs: {
    schema: pageSchema.extend({
      status: pageSchema.shape.title.optional(),
    }),
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
})

export default defineConfig({})
