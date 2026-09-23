import { ArrowRight, Loader, Mail } from "lucide-react"

import { Button } from "rockin/ui"

export function ButtonDemo() {
  return <Button>Deploy to production</Button>
}

export function ButtonVariantsDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </div>
  )
}

export function ButtonSizesDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Button size="xs">Extra small</Button>
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  )
}

export function ButtonIconsDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Button>
        <Mail data-icon="inline-start" /> Email invoice
      </Button>
      <Button variant="outline">
        Continue <ArrowRight data-icon="inline-end" />
      </Button>
      <Button variant="destructive" size="icon-sm" aria-label="Loading">
        <Loader />
      </Button>
    </div>
  )
}

export function ButtonDisabledDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Button disabled>Disabled</Button>
      <Button variant="outline" disabled>
        Disabled
      </Button>
    </div>
  )
}
