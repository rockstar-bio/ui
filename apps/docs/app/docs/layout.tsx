import type { ReactNode } from "react"
import { source } from "@/lib/source"
import { GlassDocsLayout } from "@/components/glass-docs-layout"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <GlassDocsLayout tree={source.pageTree}>
      {children}
    </GlassDocsLayout>
  )
}
