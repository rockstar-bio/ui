"use client"

import type { ReactNode } from "react"
import { TopLoader } from "rockin"

export function TopLoaderProvider({ children }: { children: ReactNode }) {
  return <TopLoader>{children}</TopLoader>
}
