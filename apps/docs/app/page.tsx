import Link from "next/link"
import {
  ArrowRight,
  ExternalLink,
  Sparkles,
} from "lucide-react"
import { SearchTrigger } from "fumadocs-ui/layouts/shared/slots/search-trigger"

import { AccentPicker } from "@/components/accent"
import { CopyCommand } from "@/components/home/copy-command"
import { ShowcaseGrid } from "@/components/home/showcase"
import { GitHubIcon } from "@/components/icons"



export default function Home() {
  return (
    <main className="text-fd-foreground min-h-screen">
      <header className="bg-fd-background/85 sticky top-0 z-40 backdrop-blur-xl">
        <div className="mx-auto flex py-2 max-w-360 items-center gap-4 px-4 sm:px-8 lg:gap-8">
          <nav
            className="text-fd-muted-foreground hidden items-center gap-1 text-[15px] lg:flex"
            aria-label="Main navigation"
          >
            <Link
              className="hover:bg-fd-accent hover:text-fd-accent-foreground focus-visible:ring-fd-ring rounded-md px-3 py-2 transition-colors focus-visible:ring-2 focus-visible:outline-none"
              href="/docs"
            >
              Docs
            </Link>
            <Link
              className="hover:bg-fd-accent hover:text-fd-accent-foreground focus-visible:ring-fd-ring rounded-md px-3 py-2 transition-colors focus-visible:ring-2 focus-visible:outline-none"
              href="/docs/components/button"
            >
              Components
            </Link>
            <Link
              className="hover:bg-fd-accent hover:text-fd-accent-foreground focus-visible:ring-fd-ring rounded-md px-3 py-2 transition-colors focus-visible:ring-2 focus-visible:outline-none"
              href="/docs/hooks/use-media-query"
            >
              Hooks
            </Link>
            <Link
              className="hover:bg-fd-accent hover:text-fd-accent-foreground focus-visible:ring-fd-ring rounded-md px-3 py-2 transition-colors focus-visible:ring-2 focus-visible:outline-none"
              href="/docs/lib/capacitor"
            >
              Libs
            </Link>
            <Link
              className="hover:bg-fd-accent hover:text-fd-accent-foreground focus-visible:ring-fd-ring rounded-md px-3 py-2 transition-colors focus-visible:ring-2 focus-visible:outline-none"
              href="/docs/icons/loader"
            >
              Icons
            </Link>
          </nav>
          <div className="ml-auto flex items-center gap-2">
             <SearchTrigger
              aria-label="Search documentation"
              className="border rounded-full"
            />
             <AccentPicker />
          </div>        
        </div>
      </header>

      <section className="border-fd-border/70 border-b">
        <div className="mx-auto flex max-w-4xl flex-col items-center p-4 sm:p-10 text-center">
          <Link
            href="/docs/components/toaster"
            className="border-fd-border bg-fd-secondary/60 text-fd-muted-foreground hover:text-fd-foreground inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs transition-colors"
          >
            <Sparkles className="text-fd-primary size-3.5" /> rockin 0.0.4 is
            out <ArrowRight className="size-3" />
          </Link>
          <h1 className="mt-6 max-w-3xl text-5xl font-semibold tracking-[-0.06em] text-balance sm:text-6xl">
            The UI system behind{" "}
            <span className="text-fd-primary">Rock Star products.</span>
          </h1>
          <p className="text-fd-muted-foreground mt-5 max-w-2xl text-base leading-7 sm:text-lg">
            Accessible components, expressive motion, and a shared visual
            language for every product we ship.
          </p>
          <div className="mt-7 flex flex-col items-center gap-2.5 sm:flex-row">
            <CopyCommand command="bun add rockin" />
            <Link
              href="/docs/getting-started/installation"
              className="bg-fd-primary text-fd-primary-foreground hover:bg-fd-primary/80 inline-flex h-10 items-center gap-2 rounded-md px-4 text-sm font-medium transition-colors"
            >
              Get started <ArrowRight className="size-4" />
            </Link>
          </div>
          <p className="text-fd-muted-foreground mt-4 text-xs">
            React 19 · Tailwind CSS v4 · Base UI
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-fd-primary flex items-center gap-2 text-xs font-medium">
              <span className="bg-fd-primary size-1.5 rounded-full" /> Live
              previews
            </div>
            <h2 className="mt-1.5 text-2xl font-semibold tracking-[-0.035em]">
              Components that ship.
            </h2>
            <p className="text-fd-muted-foreground mt-1.5 max-w-md text-sm leading-6">
              A small look at the primitives and patterns powering Rock Star
              products.
            </p>
          </div>
          <Link
            href="/docs/components/button"
            className="border-fd-border text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-accent-foreground hidden items-center gap-1.5 rounded-md border px-3 py-2 text-sm transition-colors sm:inline-flex"
          >
            View all components <ExternalLink className="size-3.5" />
          </Link>
        </div>
        <div className="border-fd-border bg-fd-card rounded-2xl border p-2.5 shadow-sm sm:p-3">
          <ShowcaseGrid limit={8} />
        </div>
        <div className="mt-4 text-center sm:hidden">
          <Link
            href="/docs/components/button"
            className="text-fd-muted-foreground inline-flex items-center gap-1 text-sm"
          >
            View all components <ExternalLink className="size-3.5" />
          </Link>
        </div>
      </section>

      <footer className="border-fd-border/70 border-t">
        <div className="text-fd-muted-foreground mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-6 text-xs sm:flex-row sm:px-6">
          <span>© 2026 rockin · MIT licensed</span>
          <div className="flex items-center gap-4">
            <Link className="hover:text-fd-foreground" href="/docs">
              Docs
            </Link>
            <a
              className="hover:text-fd-foreground inline-flex items-center gap-1"
              href="https://github.com/rockstar-bio/ui"
              target="_blank"
              rel="noreferrer"
            >
              <GitHubIcon className="size-3.5" /> GitHub
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}
