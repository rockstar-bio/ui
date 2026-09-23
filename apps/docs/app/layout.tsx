import type { Metadata } from "next"
import { RootProvider } from "fumadocs-ui/provider/next"
import { TooltipProvider, Toaster } from "rockin/ui"
import { AccentProvider } from "@/components/accent"
import { SearchDialogStatic } from "@/components/search-dialog"
import { TopLoaderProvider } from "@/components/top-loader-provider"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL("https://ui.rockstar.bio"),
  title: {
    default: "UI - rockin",
    template: "%s — rockin",
  },
  description:
    "Shared React components, icons, hooks, and utilities for Rock Star projects. Built on Base UI, styled with Tailwind CSS v4.",
  applicationName: "rockin",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      {
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "UI - rockin",
    description:
      "Shared React components, icons, hooks, and utilities for Rock Star projects.",
    type: "website",
    siteName: "rockin",
    images: [{ url: "/rockin.png", width: 1254, height: 1254, alt: "rockin" }],
  },
  twitter: {
    card: "summary",
    title: "UI - rockin",
    description:
      "Shared React components, icons, hooks, and utilities for Rock Star projects.",
    images: ["/rockin.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col antialiased">
        <RootProvider
          theme={{
            attribute: "class",
            defaultTheme: "system",
            enableSystem: true,
          }}
          search={{ SearchDialog: SearchDialogStatic }}
        >
          <TopLoaderProvider>
            <TooltipProvider>
              <AccentProvider />
              {children}
              <Toaster position="top-right" />
            </TooltipProvider>
          </TopLoaderProvider>
        </RootProvider>
      </body>
    </html>
  )
}
