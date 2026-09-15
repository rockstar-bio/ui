import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Rockstar UI",
  description: "Shared React components, icons, hooks, and styles for Rockstar projects.",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
