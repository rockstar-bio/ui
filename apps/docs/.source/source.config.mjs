// source.config.ts
import { defineConfig, defineDocs } from "fumadocs-mdx/config";
import { pageSchema } from "fumadocs-core/source/schema";
var { docs, meta } = defineDocs({
  docs: {
    schema: pageSchema.extend({
      status: pageSchema.shape.title.optional()
    }),
    postprocess: {
      includeProcessedMarkdown: true
    }
  }
});
var source_config_default = defineConfig({});
export {
  source_config_default as default,
  docs,
  meta
};
