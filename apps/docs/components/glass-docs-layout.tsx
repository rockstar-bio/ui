"use client"

import { GlassLayout } from "fumadocs-ui/layouts/glass"
import { useGlassLayout } from "fumadocs-ui/layouts/glass"
import { ThemeSwitch } from "fumadocs-ui/layouts/shared/slots/theme-switch"
import { isLayoutTabActive } from "fumadocs-ui/layouts/shared"
import type { Root as PageTreeRoot } from "fumadocs-core/page-tree"
import type { LayoutTab } from "fumadocs-ui/layouts/shared"
import { usePathname } from "fumadocs-core/framework"
import { SidebarCollapseTrigger, SidebarTrigger } from "fumadocs-ui/components/sidebar/base"
import { Menu, PanelLeft } from "lucide-react"
import type { ComponentProps, ReactNode } from "react"
import { GitHubIcon } from "@/components/icons"
import { AccentPicker } from "@/components/accent"

/** Sidebar header: logo only. */
function NavTitle({ className, ...props }: ComponentProps<"a">) {
  return (
    <a {...props} href="/" className={`inline-flex items-center gap-2 text-sm font-semibold ${className ?? ""}`}>
      <span className="bg-primary text-primary-foreground grid size-6 place-items-center rounded-md text-[11px]">
        r.
      </span>
      rockin
    </a>
  )
}

const glassPill = "rounded-full bg-fd-popover/80 text-fd-popover-foreground border backdrop-blur-sm shadow-sm"

const docsTabs: LayoutTab[] = [
  { title: "Components", url: "/docs/components/button" },
  { title: "Hooks", url: "/docs/hooks/use-media-query" },
  { title: "Lib", url: "/docs/lib/capacitor" },
  { title: "cn", url: "/docs/cn" },
  { title: "Icons", url: "/docs/icons/loader" },
]

/** Navbar slot (right of search): Themes accent picker + GitHub + light/dark. */
function HeaderThemes({ mobile = false }: ComponentProps<"div"> & { mobile?: boolean }) {
  // `props.className` carries the slot's shared pill border — drop it so each
  // control renders as its own separate pill.
  return (
    <div className="flex shrink-0 items-center gap-1.5">
      <AccentPicker
        className={`${glassPill} hidden h-9 items-center justify-center px-3 sm:inline-flex`}
        triggerClassName={`${glassPill} h-9 px-3`}
      />
      {mobile && <AccentPicker compact className={`${glassPill} inline-flex size-9 items-center justify-center sm:hidden`} />}
      <a
        href="https://github.com/rockstar-bio/ui"
        target="_blank"
        rel="noreferrer"
        aria-label="GitHub"
        className={`${glassPill} text-muted-foreground hover:text-fd-foreground hidden size-9 items-center justify-center transition-colors sm:inline-flex`}
      >
        <GitHubIcon className="size-4" />
      </a>
      <ThemeSwitch className={`${glassPill} shrink-0 px-1.5`} />
    </div>
  )
}

function GlassHeader(props: ComponentProps<"div">) {
  const { props: layoutProps, slots } = useGlassLayout()
  const pathname = usePathname()

  const tabs = layoutProps.tabs.map((tab) => (
    <a
      key={tab.url}
      href={tab.url}
      className={`shrink-0 rounded-full px-3 py-1.5 text-sm transition-colors ${isLayoutTabActive(tab, pathname) ? "bg-fd-primary/10 font-medium text-fd-primary" : "text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-accent-foreground"}`}
    >
      {tab.title}
    </a>
  ))

  return (
    <div {...props} className="contents">
      <div className="sticky z-20 hidden flex-row items-center justify-end gap-2 border-b border-fd-border/60 bg-fd-background/75 px-6 pt-2 backdrop-blur-xl [grid-area:left-margin/left-margin/right/right] md:flex md:top-0 md:h-14 md:bg-linear-to-b md:from-fd-background">
        <nav className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto" aria-label="Documentation sections">
          {tabs}
        </nav>
        <div className="hidden max-w-[220px] flex-1 md:block">
          {slots.searchTrigger && <slots.searchTrigger.full className="w-full" />}
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <SidebarCollapseTrigger className={`${glassPill} hidden size-9 items-center justify-center text-fd-muted-foreground transition-colors hover:text-fd-foreground md:inline-flex`}>
            <PanelLeft className="size-4" />
          </SidebarCollapseTrigger>
          <HeaderThemes />
        </div>
      </div>

      <div className="fixed inset-x-0 top-0 z-30 flex h-14 items-center justify-between border-b border-fd-border/60 bg-fd-background/85 px-4 backdrop-blur-xl md:hidden">
        <NavTitle className="text-sm" />
        <div className="flex items-center gap-1.5">
          {slots.searchTrigger && <slots.searchTrigger.sm className={`${glassPill} size-9`} />}
          <HeaderThemes mobile />
          <SidebarTrigger className={`${glassPill} inline-flex size-9 items-center justify-center text-fd-muted-foreground transition-colors hover:text-fd-foreground`}>
            <Menu className="size-4" />
          </SidebarTrigger>
        </div>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-30 flex h-16 items-center gap-1 overflow-x-auto border-t border-fd-border/60 bg-fd-background/90 px-3 pb-3 pt-2 backdrop-blur-xl md:hidden" aria-label="Documentation sections">
        {tabs}
      </nav>
    </div>
  )
}

export function GlassDocsLayout({
  tree,
  children,
}: {
  tree: PageTreeRoot
  children: ReactNode
}) {
  return (
    <GlassLayout
      tree={tree}
      tabs={docsTabs}
      nav={{ title: "rockin" }}
      slots={{
        navTitle: NavTitle,
        header: GlassHeader,
        themeSwitch: HeaderThemes,
      }}
    >
      {children}
    </GlassLayout>
  )
}
