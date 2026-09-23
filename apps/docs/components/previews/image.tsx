"use client"

import { Image } from "rockin/ui"

export function ImageFallbackDemo() {
  return (
    <Image
      src={null}
      alt="Demo fallback"
      width={320}
      height={180}
      wrapper="w-72 rounded-xl border bg-muted/30"
      className="h-44 w-full object-cover"
    />
  )
}
