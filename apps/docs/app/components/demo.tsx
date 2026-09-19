"use client"

import { useState } from "react"
import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input } from "rockin/ui"

export function ComponentDemo() {
  const [count, setCount] = useState(0)

  return (
    <div className="grid gap-4 md:grid-cols-[1fr_1fr]">
      <Card className="bg-background/80">
        <CardHeader>
          <div className="flex items-center justify-between gap-3">
            <div>
              <CardTitle>Button</CardTitle>
              <CardDescription>Keyboard-friendly, compact actions.</CardDescription>
            </div>
            <Badge variant="secondary">Interactive</Badge>
          </div>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-3">
          <Button onClick={() => setCount((value) => value + 1)}>Clicked {count} times</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </CardContent>
      </Card>

      <Card className="bg-background/80">
        <CardHeader>
          <CardTitle>Input</CardTitle>
          <CardDescription>Use the same primitive across product surfaces.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <label className="grid gap-2 text-sm font-medium" htmlFor="demo-email">
            Email address
            <Input id="demo-email" placeholder="you@example.com" type="email" />
          </label>
          <p className="text-sm text-muted-foreground">The component inherits the package theme tokens.</p>
        </CardContent>
      </Card>
    </div>
  )
}
