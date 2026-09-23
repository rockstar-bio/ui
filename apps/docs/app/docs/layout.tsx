import type { ReactNode } from "react"
import { GlassLayout } from "fumadocs-ui/layouts/glass"
import { source } from "@/lib/source"
import { SidebarBrand } from "@/components/sidebar-brand"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <GlassLayout
      tree={source.pageTree}
      nav={{ title: "rockin" }}
      slots={{ navTitle: SidebarBrand }}
    >
      {children}
    </GlassLayout>
  )
}
