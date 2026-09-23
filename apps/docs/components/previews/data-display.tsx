import { Bell, Plus } from "lucide-react"

import { Avatar, AvatarBadge, AvatarFallback, AvatarGroup, AvatarGroupCount, Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle, ScrollArea } from "rockin/ui"

const people = [
  { name: "Ada Lovelace", initials: "AL", role: "Founder" },
  { name: "Grace Hopper", initials: "GH", role: "Engineer" },
  { name: "Alan Turing", initials: "AT", role: "Research" },
  { name: "Katherine Johnson", initials: "KJ", role: "Math" },
]

export function AvatarDemo() {
  return (
    <div className="flex items-center gap-4">
      <Avatar size="sm">
        <AvatarFallback>AL</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>GH</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback>AT</AvatarFallback>
      </Avatar>
    </div>
  )
}

export function AvatarGroupDemo() {
  return (
    <div className="flex flex-col items-center gap-3">
      <AvatarGroup>
        {people.slice(0, 3).map((person) => (
          <Avatar key={person.initials}>
            <AvatarFallback>{person.initials}</AvatarFallback>
          </Avatar>
        ))}
        <AvatarGroupCount>+6</AvatarGroupCount>
      </AvatarGroup>
      <p className="text-xs text-muted-foreground">Ada, Grace and 6 others reacted</p>
    </div>
  )
}

export function AvatarBadgeDemo() {
  return (
    <div className="flex items-center gap-4">
      <Avatar>
        <AvatarFallback>RS</AvatarFallback>
        <AvatarBadge>
          <Bell />
        </AvatarBadge>
      </Avatar>
      <Avatar>
        <AvatarFallback>ON</AvatarFallback>
        <AvatarBadge className="bg-emerald-500" />
      </Avatar>
    </div>
  )
}

const commits = [
  { hash: "a1b2c3d", message: "fix: clamp drawer snap points to viewport", author: "ada" },
  { hash: "e4f5g6h", message: "feat(dock): add haptic feedback on tap", author: "grace" },
  { hash: "i7j8k9l", message: "chore: release rockin@0.0.4", author: "bot" },
  { hash: "m0n1o2p", message: "refactor: move easing tokens to otp module", author: "alan" },
  { hash: "q3r4s5t", message: "fix: scroll-area corner overlap on firefox", author: "katherine" },
  { hash: "u6v7w8x", message: "docs: document QuantityInput props", author: "grace" },
  { hash: "y9z0a1b", message: "feat: add QRCode error correction levels", author: "ada" },
  { hash: "c2d3e4f", message: "perf: lazy init skeleton style tag", author: "alan" },
]

export function ScrollAreaDemo() {
  return (
    <ScrollArea className="h-44 w-full max-w-sm rounded-lg border">
      <div className="divide-y px-3">
        {commits.map((commit) => (
          <div key={commit.hash} className="flex items-center justify-between gap-3 py-2.5">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{commit.message}</p>
              <p className="text-xs text-muted-foreground">
                {commit.author} committed {commit.hash}
              </p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}

export function EmptyDemo() {
  return (
    <Empty className="w-full max-w-sm border border-dashed rounded-xl">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Plus />
        </EmptyMedia>
        <EmptyTitle>No integrations yet</EmptyTitle>
        <EmptyDescription>
          Connect Slack, Linear or GitHub and your team activity will show up here.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <p className="text-xs text-muted-foreground">It takes less than a minute.</p>
      </EmptyContent>
    </Empty>
  )
}
