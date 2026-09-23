"use client"

import { BellIcon, IconSwap, Loader } from "rockin/icon"
import { Search, X } from "lucide-react"
import { useState } from "react"

export function LoaderDemo() {
  return (
    <div className="flex items-center gap-6">
      <Loader size={16} />
      <Loader size={24} />
      <Loader size={32} className="text-primary" />
      <Loader size={24} color="var(--brand)" />
    </div>
  )
}

export function BellIconDemo() {
  return (
    <div className="flex items-center gap-6">
      <BellIcon size={24} />
      <BellIcon size={24} duration={0.6} />
      <BellIcon size={24} color="var(--brand)" />
      <BellIcon size={24} isAnimated={false} />
    </div>
  )
}

export function IconSwapDemo() {
  const [active, setActive] = useState(false)
  return (
    <button
      onClick={() => setActive((v) => !v)}
      className="text-muted-foreground hover:text-foreground rounded-md p-2 transition-colors"
      aria-label="Toggle search"
    >
      <IconSwap active={active} first={<Search />} second={<X />} />
    </button>
  )
}
