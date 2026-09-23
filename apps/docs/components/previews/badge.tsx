import { ArrowUpRight, Sparkles } from "lucide-react"

import { Badge } from "rockin/ui"

export function BadgeDemo() {
  return <Badge>Merged</Badge>
}

export function BadgeVariantsDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="ghost">Ghost</Badge>
      <Badge variant="destructive">Breaking</Badge>
      <Badge variant="link">Link</Badge>
    </div>
  )
}

export function BadgeWithIconDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Badge>
        <Sparkles /> New in 0.0.4
      </Badge>
      <Badge variant="secondary">
        Revenue <ArrowUpRight /> 12.4%
      </Badge>
    </div>
  )
}

export function BadgeAsLinkDemo() {
  return (
    <Badge variant="outline" render={<a href="/docs/components/badge" />}>
      Read the changelog
    </Badge>
  )
}
