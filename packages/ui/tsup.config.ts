import { defineConfig } from "tsup"

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "ui/index": "src/ui/index.ts",
    "icon/index": "src/icon/index.ts",
    "hooks/index": "src/hooks/index.ts",
    "lib/index": "src/lib/index.ts",
    "utils/index": "src/utils/index.ts",
  },
  format: ["esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  splitting: false,
  outDir: "dist",
  external: ["react", "react-dom"],
  onSuccess: "cp src/styles/globals.css dist/styles.css",
})
