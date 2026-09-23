"use client"

import { useState } from "react"

export function CopyCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      onClick={async () => {
        await navigator.clipboard.writeText(command)
        setCopied(true)
        setTimeout(() => setCopied(false), 1600)
      }}
      className="group flex items-center gap-3 rounded-xl border border-border bg-muted/60 py-2.5 pr-3 pl-4 font-mono text-sm shadow-sm transition-colors hover:bg-muted"
    >
      <span className="text-muted-foreground select-none">$</span>
      <span>{command}</span>
      <span className="ml-2 text-xs text-muted-foreground group-hover:text-foreground">
        {copied ? "copied ✓" : "copy"}
      </span>
    </button>
  )
}
