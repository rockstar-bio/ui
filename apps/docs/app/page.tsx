import { ComponentDemo } from "./components/demo"

const install = "bun add @rock.star/ui"
const usage = `import { Button } from "@rock.star/ui"
import { Loader, useMounted } from "@rock.star/ui"
import "@rock.star/ui/styles.css"`

export default function Home() {
  return (
    <main className="docs-grid min-h-screen">
      <header className="border-b border-border/70 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <a className="flex items-center gap-3 font-semibold tracking-tight" href="#top">
            <span className="grid size-8 place-items-center rounded-lg bg-primary text-sm text-primary-foreground">r.</span>
            rockstar/ui
          </a>
          <nav className="flex items-center gap-5 text-sm text-muted-foreground">
            <a className="hover:text-foreground" href="#install">Install</a>
            <a className="hover:text-foreground" href="#components">Components</a>
            <a className="hover:text-foreground" href="https://github.com/rockstar-bio/ui">GitHub</a>
          </nav>
        </div>
      </header>

      <div id="top" className="mx-auto grid max-w-7xl gap-12 px-5 py-14 lg:grid-cols-[220px_1fr] lg:px-8 lg:py-20">
        <aside className="hidden lg:block">
          <div className="sticky top-8 space-y-6 text-sm">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">On this page</p>
              <div className="grid gap-2 border-l border-border pl-4 text-muted-foreground">
                <a className="hover:text-foreground" href="#install">Install</a>
                <a className="hover:text-foreground" href="#usage">Usage</a>
                <a className="hover:text-foreground" href="#components">Components</a>
              </div>
            </div>
            <p className="text-xs leading-5 text-muted-foreground">A shared foundation for Rockstar products.</p>
          </div>
        </aside>

        <article className="min-w-0 max-w-4xl">
          <div className="mb-16 max-w-3xl">
            <p className="mb-4 font-mono text-sm text-brand">@rock.star/ui</p>
            <h1 className="max-w-2xl text-4xl font-semibold tracking-[-0.04em] text-balance sm:text-6xl">Build once. Keep every Rockstar product familiar.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">A practical React UI layer with accessible primitives, motion-ready components, icons, hooks, and shared theme styles.</p>
          </div>

          <section id="install" className="scroll-mt-8 border-t border-border/70 py-10">
            <p className="mb-2 font-mono text-sm text-brand">01 / Install</p>
            <h2 className="text-2xl font-semibold tracking-tight">Add the package</h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">Install the package once in any React or Next.js project.</p>
            <pre className="code-block mt-6"><code>{install}</code></pre>
          </section>

          <section id="usage" className="scroll-mt-8 border-t border-border/70 py-10">
            <p className="mb-2 font-mono text-sm text-brand">02 / Usage</p>
            <h2 className="text-2xl font-semibold tracking-tight">Import what you need</h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">UI components are available from the root. Icons, hooks, utilities, and styles use focused subpaths.</p>
            <pre className="code-block mt-6"><code>{usage}</code></pre>
          </section>

          <section id="components" className="scroll-mt-8 border-t border-border/70 py-10">
            <p className="mb-2 font-mono text-sm text-brand">03 / Components</p>
            <h2 className="text-2xl font-semibold tracking-tight">Try the primitives</h2>
            <p className="mt-3 mb-6 max-w-2xl text-muted-foreground">These examples are rendered from the same package that your applications install.</p>
            <ComponentDemo />
          </section>

          <footer className="border-t border-border/70 py-8 text-sm text-muted-foreground">
            <span>Rockstar UI · </span><a className="text-foreground underline underline-offset-4" href="https://github.com/rockstar-bio/ui">Source on GitHub</a>
          </footer>
        </article>
      </div>
    </main>
  )
}
