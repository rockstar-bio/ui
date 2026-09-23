import Link from "next/link"
import { ArrowRight, ExternalLink, Sparkles } from "lucide-react"
import { ThemeSwitch } from "fumadocs-ui/layouts/shared/slots/theme-switch"

import { AccentPicker } from "@/components/accent"
import { CopyCommand } from "@/components/home/copy-command"
import { ShowcaseGrid } from "@/components/home/showcase"
import { GitHubIcon } from "@/components/icons"

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2 font-semibold tracking-tight text-fd-foreground">
      <span className={`${compact ? "size-6 text-[10px]" : "size-7 text-xs"} grid place-items-center rounded-md bg-fd-foreground font-black text-fd-background`}>r.</span>
      {!compact && "rockin"}
    </span>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen bg-fd-background text-fd-foreground">
      <header className="sticky top-0 z-40 border-b border-fd-border/70 bg-fd-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" aria-label="rockin home"><Logo /></Link>
          <nav className="hidden items-center gap-1 text-sm text-fd-muted-foreground sm:flex" aria-label="Main navigation">
            <Link className="rounded-md px-3 py-1.5 transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground" href="/docs">Docs</Link>
            <Link className="rounded-md px-3 py-1.5 transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground" href="/docs/components/button">Components</Link>
            <Link className="rounded-md px-3 py-1.5 transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground" href="/docs/icons">Icons</Link>
          </nav>
          <div className="flex items-center gap-1.5">
            <AccentPicker triggerClassName="hidden h-8 items-center gap-1.5 rounded-md border border-fd-border bg-fd-secondary/60 px-2.5 text-xs font-medium text-fd-muted-foreground sm:inline-flex" />
            <a href="https://github.com/rockstar-bio/ui" target="_blank" rel="noreferrer" aria-label="GitHub" className="grid size-8 place-items-center rounded-md text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground"><GitHubIcon className="size-4" /></a>
            <ThemeSwitch className="rounded-md border border-fd-border bg-fd-secondary/60 px-1.5" />
          </div>
        </div>
      </header>

      <section className="border-b border-fd-border/70">
        <div className="mx-auto flex max-w-4xl flex-col items-center px-4 pb-14 pt-20 text-center sm:px-6 sm:pt-24 sm:pb-16">
          <Link href="/docs/components/toaster" className="inline-flex items-center gap-1.5 rounded-full border border-fd-border bg-fd-secondary/60 px-3 py-1 text-xs text-fd-muted-foreground transition-colors hover:text-fd-foreground"><Sparkles className="size-3.5 text-fd-primary" /> rockin 0.0.4 is out <ArrowRight className="size-3" /></Link>
          <h1 className="mt-6 max-w-3xl text-5xl font-semibold tracking-[-0.06em] text-balance sm:text-6xl">The UI system behind <span className="text-fd-primary">Rock Star products.</span></h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-fd-muted-foreground sm:text-lg">Accessible components, expressive motion, and a shared visual language for every product we ship.</p>
          <div className="mt-7 flex flex-col items-center gap-2.5 sm:flex-row"><CopyCommand command="bun add rockin" /><Link href="/docs/getting-started/installation" className="inline-flex h-10 items-center gap-2 rounded-md bg-fd-primary px-4 text-sm font-medium text-fd-primary-foreground transition-colors hover:bg-fd-primary/80">Get started <ArrowRight className="size-4" /></Link></div>
          <p className="mt-4 text-xs text-fd-muted-foreground">React 19 · Tailwind CSS v4 · Base UI</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><div className="flex items-center gap-2 text-xs font-medium text-fd-primary"><span className="size-1.5 rounded-full bg-fd-primary" /> Live previews</div><h2 className="mt-1.5 text-2xl font-semibold tracking-[-0.035em]">Components that ship.</h2><p className="mt-1.5 max-w-md text-sm leading-6 text-fd-muted-foreground">A small look at the primitives and patterns powering Rock Star products.</p></div><Link href="/docs/components/button" className="hidden items-center gap-1.5 rounded-md border border-fd-border px-3 py-2 text-sm text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground sm:inline-flex">View all components <ExternalLink className="size-3.5" /></Link></div>
        <div className="rounded-2xl border border-fd-border bg-fd-card p-2.5 shadow-sm sm:p-3"><ShowcaseGrid limit={8} /></div>
        <div className="mt-4 text-center sm:hidden"><Link href="/docs/components/button" className="inline-flex items-center gap-1 text-sm text-fd-muted-foreground">View all components <ExternalLink className="size-3.5" /></Link></div>
      </section>

      <footer className="border-t border-fd-border/70"><div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-6 text-xs text-fd-muted-foreground sm:flex-row sm:px-6"><Link href="/"><Logo compact /></Link><span>© 2026 Rock Star Bio · MIT licensed</span><div className="flex items-center gap-4"><Link className="hover:text-fd-foreground" href="/docs">Docs</Link><a className="inline-flex items-center gap-1 hover:text-fd-foreground" href="https://github.com/rockstar-bio/ui" target="_blank" rel="noreferrer"><GitHubIcon className="size-3.5" /> GitHub</a></div></div></footer>
    </main>
  )
}
