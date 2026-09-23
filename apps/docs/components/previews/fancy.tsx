"use client"

import { Compass, Home, Image as ImageIcon, Mail, Music, Search, Settings } from "lucide-react"

import { Apple, DashedSeparator, Dock, JellyAction, JellyGroup, JellyLink, JellyMascot } from "rockin/ui"

export function AppleHelloDemo() {
  return <Apple />
}

export function DockDemo() {
  const items = [
    { icon: Home, label: "Home", onClick: () => {} },
    { icon: Search, label: "Search", onClick: () => {} },
    { icon: Compass, label: "Explore", onClick: () => {} },
    { icon: ImageIcon, label: "Gallery", onClick: () => {} },
    { icon: Music, label: "Music", onClick: () => {} },
    { icon: Mail, label: "Mail", onClick: () => {} },
    { icon: Settings, label: "Settings", onClick: () => {} },
  ]
  return <Dock items={items} className="h-40" />
}

export function DashedSeparatorDemo() {
  return (
    <div className="w-full max-w-xs">
      <p className="text-sm text-muted-foreground">Billing period ends in 6 days</p>
      <DashedSeparator className="my-4 text-border" thickness={1} />
      <p className="text-sm font-medium">$1,240.00 due on Oct 1</p>
    </div>
  )
}

const moods = ["happy", "curious", "surprised", "love", "sideEye", "sleepy"] as const

export function JellyDemo() {
  return (
    <JellyGroup mood="happy" speech="Hi, I'm Jelly — hover a mood!">
      <div className="flex flex-col items-center gap-4">
        <JellyMascot className="w-24" />
        <div className="flex flex-wrap justify-center gap-1.5">
          {moods.map((mood) => (
            <JellyAction key={mood} mood={mood} size="xs" variant="outline" className="capitalize">
              {mood === "sideEye" ? "side-eye" : mood}
            </JellyAction>
          ))}
        </div>
        <JellyLink
          mood="love"
          href="/docs/components/jelly"
          className="text-muted-foreground hover:text-foreground text-xs underline underline-offset-4"
        >
          The actions drive my mood
        </JellyLink>
      </div>
    </JellyGroup>
  )
}
