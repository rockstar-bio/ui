"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { demos } from "@/components/previews"

const showcase: {
  name: string
  demo: string
  description: string
  wide?: boolean
}[] = [
  { name: "Button", demo: "button", description: "A clear action with accessible states." },
  { name: "Card", demo: "card", description: "Composable surface with header, content, and footer slots.", wide: true },
  { name: "Empty", demo: "empty", description: "A useful starting point for blank states." },
  { name: "QTY", demo: "quantity", description: "Bounded quantity controls for product flows." },
  { name: "Carousel", demo: "carousel", description: "Responsive content with keyboard controls.", wide: true },
  { name: "Sortable", demo: "sortable", description: "Reorder content with a focused drag handle." },
  { name: "Image", demo: "image-fallback", description: "Graceful fallback when media is unavailable." },
  { name: "Apple Hello", demo: "apple-hello", description: "A little motion for the first hello.", wide: true },
]

export function ShowcaseGrid({ limit }: { limit?: number } = {}) {
  return (
    <div className="grid items-stretch gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {showcase.slice(0, limit ?? showcase.length).map((item) => {
        const Demo = demos[item.demo]
        if (!Demo) return null
        return (
          <div
            key={item.name}
            className={`group flex min-w-0 flex-col overflow-hidden rounded-xl border border-fd-border bg-fd-background shadow-sm ${
              item.wide ? "sm:col-span-2" : ""
            }`}
          >
            <div className="relative flex min-h-[228px] flex-1 items-center justify-center overflow-hidden border-b border-fd-border bg-fd-muted/20 p-5 sm:min-h-[248px] sm:p-7">
              <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-fd-muted-foreground/70">
                <span className="size-1.5 rounded-full bg-fd-primary/70" /> live example
              </span>
              <div className="flex w-full max-w-[520px] items-center justify-center pt-4 [&>*]:max-w-full">
                <Demo />
              </div>
            </div>
            <div className="flex min-h-[68px] flex-col justify-center gap-1 px-4 py-3.5">
              <p className="text-sm font-medium tracking-tight">{item.name}</p>
              <p className="text-xs leading-5 text-fd-muted-foreground">{item.description}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function ShowcaseSection() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
      <div className="mb-10 flex items-end justify-between gap-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Live from the library</h2>
          <p className="text-muted-foreground mt-1.5 max-w-lg">
            Real components with demo data — everything below renders from the package itself. Switch
            the theme up top and watch it all follow.
          </p>
        </div>
        <Link
          href="/docs/components/button"
          className="text-muted-foreground hover:text-foreground hidden shrink-0 items-center gap-1.5 text-sm font-medium transition-colors md:inline-flex"
        >
          Browse all components <ArrowRight className="size-4" />
        </Link>
      </div>
      <ShowcaseGrid />
      <div className="mt-8 text-center md:hidden">
        <Link
          href="/docs/components/button"
          className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm font-medium"
        >
          Browse all components <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  )
}
