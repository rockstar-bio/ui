"use client"

import Link from "next/link"
import { Palette, PenLine } from "lucide-react"
import { useEffect, useState } from "react"

import { Popover, PopoverContent, PopoverTrigger, Switch } from "rockin/ui"

export interface AccentPreset {
  name: string
  color: string
  /** More saturated variant used by the "Vibrant palette" toggle. */
  vibrant: string
}

/** `color` of the first entry is the library default brand. */
export const accentPresets: AccentPreset[] = [
  { name: "Brand", color: "#f4511e", vibrant: "#ff3600" },
  { name: "Blue", color: "#3b82f6", vibrant: "#0b63ff" },
  { name: "Violet", color: "#8b5cf6", vibrant: "#8b2dff" },
  { name: "Pink", color: "#ec4899", vibrant: "#ff1690" },
  { name: "Emerald", color: "#10b981", vibrant: "#00d26a" },
  { name: "Amber", color: "#f59e0b", vibrant: "#ffb000" },
  { name: "Cyan", color: "#06b6d4", vibrant: "#00d5e0" },
]

export const ACCENT_STORAGE_KEY = "rockin-accent"
export const VIBRANT_STORAGE_KEY = "rockin-vibrant"

/** Applies an accent to `--brand`, `--primary` and `--primary-foreground`. */
export function applyAccent(color?: string, vibrant = false) {
  const root = document.documentElement
  if (!color) {
    root.style.removeProperty("--brand")
    root.style.removeProperty("--primary")
    root.style.removeProperty("--primary-foreground")
    localStorage.removeItem(ACCENT_STORAGE_KEY)
    return
  }
  const preset = accentPresets.find((p) => p.color === color)
  const resolved = vibrant && preset ? preset.vibrant : color
  root.style.setProperty("--brand", resolved)
  root.style.setProperty("--primary", resolved)
  root.style.setProperty("--primary-foreground", "oklch(0.985 0 0)")
  localStorage.setItem(ACCENT_STORAGE_KEY, color)
}

export function applyVibrant(vibrant: boolean) {
  const saved = localStorage.getItem(ACCENT_STORAGE_KEY)
  if (vibrant) localStorage.setItem(VIBRANT_STORAGE_KEY, "1")
  else localStorage.removeItem(VIBRANT_STORAGE_KEY)
  applyAccent(saved ?? undefined, vibrant)
}

/**
 * Applies the accent + vibrant preference saved by the Themes dropdown on
 * mount. Mount once in the root layout so every page picks it up.
 */
export function AccentProvider() {
  useEffect(() => {
    const saved = localStorage.getItem(ACCENT_STORAGE_KEY)
    if (saved) {
      applyAccent(saved, localStorage.getItem(VIBRANT_STORAGE_KEY) === "1")
    }
  }, [])
  return null
}

/** "Themes" dropdown for picking the accent color — swatch grid + vibrant toggle. */
export function AccentPicker({
  className,
  triggerClassName,
  compact = false,
}: {
  className?: string
  /** Extra classes for the trigger pill (e.g. to blend into a navbar). */
  triggerClassName?: string
  /** Render a compact icon-only trigger for narrow navigation bars. */
  compact?: boolean
}) {
  const [active, setActive] = useState<string | null>(null)
  const [vibrant, setVibrant] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setActive(localStorage.getItem(ACCENT_STORAGE_KEY))
    setVibrant(localStorage.getItem(VIBRANT_STORAGE_KEY) === "1")
  }, [])

  const pick = (color?: string) => {
    applyAccent(color, vibrant)
    setActive(color ?? null)
  }

  const activeColor = active ?? accentPresets[0].color
  const activePreset = accentPresets.find((p) => p.color === active)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <button className={className ?? triggerClassName} aria-label="Themes" />
        }
      >
        {compact ? (
          <Palette className="size-4 text-muted-foreground" />
        ) : (
          <span
            className={`text-muted-foreground inline-flex items-center gap-1.5 text-xs font-medium transition-colors ${
              triggerClassName ?? "bg-muted hover:bg-muted/70 rounded-lg border px-2.5 py-1.5"
            }`}
          >
            <span
              className="size-3 rounded-full border border-border/50"
              style={{ backgroundColor: vibrant && activePreset ? activePreset.vibrant : activeColor }}
            />
            Themes
          </span>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-72 p-3" align="start">
        <div className="grid grid-cols-4 gap-x-2 gap-y-3">
          {accentPresets.map((preset, i) => {
            const isDefault = i === 0
            const isActive = isDefault ? active === null : active === preset.color
            const swatchColor = vibrant && !isDefault ? preset.vibrant : preset.color
            return (
              <button
                key={preset.name}
                onClick={() => pick(isDefault ? undefined : preset.color)}
                className="flex flex-col items-center gap-1.5"
              >
                <span
                  aria-hidden
                  className={`size-11 rounded-full border border-border/40 transition-transform hover:scale-105 ${
                    isActive ? "ring-2 ring-ring ring-offset-2 ring-offset-background" : ""
                  }`}
                  style={{ backgroundColor: swatchColor }}
                />
                <span
                  className={`text-[11px] leading-none ${
                    isActive ? "text-foreground font-medium" : "text-muted-foreground"
                  }`}
                >
                  {preset.name}
                </span>
              </button>
            )
          })}
        </div>

        <div className="mt-3 flex items-center justify-between gap-3 border-t pt-3">
          <div>
            <p className="text-sm font-medium">Vibrant palette</p>
            <p className="text-muted-foreground text-xs">More saturated, less contrast</p>
          </div>
          <Switch
            size="sm"
            checked={vibrant}
            onCheckedChange={(v) => {
              setVibrant(v === true)
              applyVibrant(v === true)
            }}
            aria-label="Vibrant palette"
          />
        </div>

        <Link
          href="/docs/getting-started/theming"
          onClick={() => setOpen(false)}
          className="hover:bg-muted mt-3 flex w-full items-center justify-center gap-2 rounded-lg border py-2 text-sm font-medium transition-colors"
        >
          <PenLine className="size-4" />
          Edit theme
        </Link>
      </PopoverContent>
    </Popover>
  )
}
