import type { Metadata } from "next"
import { RootProvider } from "fumadocs-ui/provider/next"
import { TooltipProvider, Toaster } from "rockin/ui"
import { AccentProvider } from "@/components/accent"
import { SearchDialogStatic } from "@/components/search-dialog"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL("https://ui.rockstar.bio"),
  title: {
    default: "rockin — Rock Star UI",
    template: "%s — rockin",
  },
  description:
    "Shared React components, icons, hooks, and utilities for Rock Star projects. Built on Base UI, styled with Tailwind CSS v4.",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col antialiased">
        <RootProvider
          theme={{ attribute: "class", defaultTheme: "system", enableSystem: true }}
          search={{ SearchDialog: SearchDialogStatic }}
        >
          <TooltipProvider>
            <AccentProvider />
            {children}
            <Toaster position="top-right" />
          </TooltipProvider>
        </RootProvider>
      </body>
    </html>
  )
}
