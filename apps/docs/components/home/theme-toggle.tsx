"use client"

import { Monitor, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return <span className="size-9" />

  const next = theme === "dark" ? "light" : theme === "light" ? "system" : "dark"
  const Icon = theme === "dark" ? Moon : theme === "light" ? Sun : Monitor

  return (
    <button
      onClick={() => setTheme(next)}
      aria-label="Toggle theme"
      className="text-muted-foreground hover:text-foreground hover:bg-muted grid size-9 place-items-center rounded-lg border border-border transition-colors"
    >
      <Icon className="size-4" />
    </button>
  )
}
