import { Bell, CreditCard, TrendingUp } from "lucide-react"

import { Badge, Button, Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "rockin/ui"

export function CardDemo() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Team plan</CardTitle>
        <CardDescription>Everything you need to ship together.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-1.5">
        <p className="text-3xl font-semibold tracking-tight">
          $24<span className="text-base font-normal text-muted-foreground"> / user / month</span>
        </p>
        <p className="text-sm text-muted-foreground">Billed annually. Cancel anytime.</p>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button className="w-full">Start 14-day trial</Button>
        <p className="text-xs text-muted-foreground">No credit card required.</p>
      </CardFooter>
    </Card>
  )
}

export function CardActionDemo() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Monthly revenue</CardTitle>
        <CardDescription>Across all workspaces</CardDescription>
        <CardAction>
          <Badge variant="secondary">
            <TrendingUp /> +12.4%
          </Badge>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="text-4xl font-semibold tracking-tight">$48,219</p>
        <p className="mt-1 text-sm text-muted-foreground">vs. $42,900 last month</p>
      </CardContent>
    </Card>
  )
}

export function CardSmallDemo() {
  return (
    <div className="flex items-center justify-center gap-3">
      <Card size="sm" className="w-44">
        <CardHeader>
          <CardTitle className="text-sm">Notifications</CardTitle>
          <CardDescription className="text-xs">Push, email</CardDescription>
          <CardAction>
            <Bell className="size-4 text-muted-foreground" />
          </CardAction>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold">7 new</p>
        </CardContent>
      </Card>
      <Card size="sm" className="w-44">
        <CardHeader>
          <CardTitle className="text-sm">Payments</CardTitle>
          <CardDescription className="text-xs">
            <CreditCard className="mr-1 inline size-3" /> Visa ···· 4242
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold">3 due</p>
        </CardContent>
      </Card>
    </div>
  )
}
