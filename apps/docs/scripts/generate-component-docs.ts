/**
 * Generates content/docs/components/*.mdx + meta.json from the config below.
 * Run: bun scripts/generate-component-docs.ts
 */
import * as fs from "node:fs"
import * as path from "node:path"

const CONTENT_DIR = path.join(import.meta.dir, "../content/docs/components")

interface Example {
  name: string
  title: string
  description?: string
}

interface ManualProp {
  name: string
  type: string
  default?: string
  description?: string
}

interface ComponentDocConfig {
  slug: string
  title: string
  description: string
  component: string
  sourcePath: string
  preview?: string
  usage: string
  importCode: string
  parts?: string[]
  props?: string[]
  manualProps?: ManualProp[]
  examples?: Example[]
  notes?: string
  /** Hide from sidebar (advanced / internal pieces) */
  hidden?: boolean
  /** Group heading in the sidebar */
  group?: "Primitives" | "Forms" | "Overlays" | "Navigation & data" | "Chat" | "Motion & fun"
}

const DOCS: ComponentDocConfig[] = [
  {
    slug: "button",
    title: "Button",
    description: "Triggers actions and events. Built on the Base UI Button with six variants and nine sizes.",
    component: "Button",
    sourcePath: "ui/button.tsx",
    preview: "button",
    usage: `import { Button } from "rockin/ui"

export function Example() {
  return <Button onClick={() => console.log("clicked")}>Deploy to production</Button>
}`,
    importCode: `import { Button, buttonVariants } from "rockin/ui"`,
    props: ["Button"],
    examples: [
      { name: "button-variants", title: "Variants", description: "Six visual styles — default, secondary, outline, ghost, destructive and link." },
      { name: "button-sizes", title: "Sizes", description: "Extra small, small, default and large. Icon-only sizes (`icon`, `icon-xs`, `icon-sm`, `icon-lg`) render square buttons." },
      { name: "button-icons", title: "With icons", description: "Add `data-icon=\"inline-start\"` or `data-icon=\"inline-end\"` to a child icon to opt into the tighter padding." },
      { name: "button-disabled", title: "Disabled", description: "Disabled buttons drop pointer events and render at 50% opacity." },
    ],
    notes: `Buttons auto-size child SVG icons and flatten their radius when nested inside a \`ButtonGroup\`. To render a button-styled link, pass the \`render\` prop: \`<Button render={<a href="/pricing" />}>Pricing</Button>\`.`,
    group: "Primitives",
  },
  {
    slug: "badge",
    title: "Badge",
    description: "Small status label for counts, states and metadata. Renders a span by default.",
    component: "Badge",
    sourcePath: "ui/badge.tsx",
    preview: "badge",
    usage: `import { Badge } from "rockin/ui"

export function Example() {
  return <Badge>Merged</Badge>
}`,
    importCode: `import { Badge, badgeVariants } from "rockin/ui"`,
    props: ["Badge"],
    examples: [
      { name: "badge-variants", title: "Variants", description: "Default, secondary, outline, ghost, destructive and link." },
      { name: "badge-with-icon", title: "With icons", description: "Icons are auto-sized to 12px. Use `data-icon` for icon-aware padding." },
      { name: "badge-as-link", title: "As a link", description: "Pass `render={<a href=… />}` to make the whole badge clickable." },
    ],
    group: "Primitives",
  },
  {
    slug: "card",
    title: "Card",
    description: "Grouped surface with header, content, footer and an optional action slot.",
    component: "Card",
    sourcePath: "ui/card.tsx",
    preview: "card",
    usage: `import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "rockin/ui"

export function Example() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Team plan</CardTitle>
        <CardDescription>Everything you need to ship together.</CardDescription>
      </CardHeader>
      <CardContent>$24 / user / month</CardContent>
      <CardFooter>Cancel anytime.</CardFooter>
    </Card>
  )
}`,
    importCode: `import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "rockin/ui"`,
    parts: ["Card", "CardHeader", "CardTitle", "CardDescription", "CardAction", "CardContent", "CardFooter"],
    props: ["Card", "CardHeader", "CardTitle", "CardDescription", "CardAction", "CardContent", "CardFooter"],
    manualProps: [
      { name: "size", type: '"default" | "sm"', default: '"default"', description: "Controls the internal `--card-spacing` (16px vs 12px)." },
    ],
    examples: [
      { name: "card-action", title: "With an action", description: "CardAction sits inline with the title — perfect for badges or icon buttons." },
      { name: "card-small", title: "Compact cards", description: "size=\"sm\" tightens spacing for dashboard tiles." },
    ],
    notes: `\`CardFooter\` carries a top border and muted background, and cancels the card's bottom padding. The first and last child images inside \`CardContent\` get automatic rounded corners, so banner-style images need no extra classes.`,
    group: "Primitives",
  },
  {
    slug: "separator",
    title: "Separator",
    description: "Horizontal or vertical divider line, built on the Base UI Separator.",
    component: "Separator",
    sourcePath: "ui/separator.tsx",
    preview: "separator",
    usage: `import { Separator } from "rockin/ui"

export function Example() {
  return <Separator className="my-4" />
}`,
    importCode: `import { Separator } from "rockin/ui"`,
    props: ["Separator"],
    group: "Primitives",
  },
  {
    slug: "skeleton",
    title: "Skeleton",
    description: "Loading placeholder with shimmer or fade animation and built-in a11y semantics.",
    component: "Skeleton",
    sourcePath: "ui/skeleton.tsx",
    preview: "skeleton",
    usage: `import { Skeleton } from "rockin/ui"

export function Example() {
  return <Skeleton className="h-4 w-48" />
}`,
    importCode: `import { Skeleton, SkeletonAvatar, SkeletonButton, SkeletonText } from "rockin/ui"`,
    props: ["SkeletonAvatar", "SkeletonButton", "SkeletonText"],
    manualProps: [
      { name: "variant", type: '"shimmer" | "fade"', default: '"shimmer"', description: "Animation style." },
      { name: "rounded", type: '"none" | "sm" | "md" | "lg" | "full"', default: '"md"', description: "Corner rounding." },
      { name: "duration", type: "number", default: "1.6", description: "Loop duration in seconds (fade defaults to 2.4)." },
      { name: "animate", type: "boolean", default: "true", description: "Turn the animation off for static placeholders." },
      { name: "decorative", type: "boolean", default: "true", description: "When false, renders role=\"status\" with aria-live and uses `label`." },
      { name: "label", type: "string | null", description: "Accessible label when not decorative. Defaults to \"Loading\"." },
    ],
    examples: [
      { name: "skeleton-card", title: "Composed loading card", description: "SkeletonAvatar, SkeletonText and SkeletonButton combined into a realistic loading state." },
    ],
    notes: `Skeleton manages its own animation styles and respects \`prefers-reduced-motion\`. Use the composites (\`SkeletonAvatar\`, \`SkeletonText\`, \`SkeletonButton\`) for common shapes.`,
    group: "Primitives",
  },
  {
    slug: "kbd",
    title: "Kbd",
    description: "Keyboard key hint with an optional group for combos.",
    component: "Kbd",
    sourcePath: "ui/kbd.tsx",
    preview: "kbd",
    usage: `import { Kbd, KbdGroup } from "rockin/ui"

export function Example() {
  return (
    <KbdGroup>
      <Kbd>⌘</Kbd>
      <Kbd>K</Kbd>
    </KbdGroup>
  )
}`,
    importCode: `import { Kbd, KbdGroup } from "rockin/ui"`,
    props: ["Kbd", "KbdGroup"],
    notes: `Kbd automatically inverts its colors inside a tooltip content, so shortcut hints stay readable.`,
    group: "Primitives",
  },
  {
    slug: "avatar",
    title: "Avatar",
    description: "User image with fallback initials, status badge, and grouping.",
    component: "Avatar",
    sourcePath: "ui/avatar.tsx",
    preview: "avatar",
    usage: `import { Avatar, AvatarFallback, AvatarImage } from "rockin/ui"

export function Example() {
  return (
    <Avatar>
      <AvatarImage src="/ada.png" alt="Ada Lovelace" />
      <AvatarFallback>AL</AvatarFallback>
    </Avatar>
  )
}`,
    importCode: `import { Avatar, AvatarBadge, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from "rockin/ui"`,
    props: ["Avatar", "AvatarImage", "AvatarFallback", "AvatarBadge", "AvatarGroup", "AvatarGroupCount"],
    manualProps: [
      { name: "size", type: '"default" | "sm" | "lg"', default: '"default"', description: "Renders 32px, 24px or 40px (set as `data-size`)." },
    ],
    examples: [
      { name: "avatar-group", title: "Avatar group", description: "Stacked avatars with a truncated count." },
      { name: "avatar-badge", title: "Status badge", description: "AvatarBadge renders an icon or a plain status dot; icons hide on small avatars." },
    ],
    group: "Primitives",
  },
  {
    slug: "scroll-area",
    title: "Scroll Area",
    description: "Custom-styled scroll container with overlay scrollbars, built on Base UI ScrollArea.",
    component: "ScrollArea",
    sourcePath: "ui/scroll-area.tsx",
    preview: "scroll-area",
    usage: `import { ScrollArea } from "rockin/ui"

export function Example() {
  return (
    <ScrollArea className="h-44 rounded-lg border">
      {/* your long content */}
    </ScrollArea>
  )
}`,
    importCode: `import { ScrollArea, ScrollBar } from "rockin/ui"`,
    props: ["ScrollArea", "ScrollBar"],
    notes: "`ScrollArea` composes the viewport, a vertical scrollbar and the corner automatically — just give it a height.",
    group: "Primitives",
  },
  {
    slug: "empty",
    title: "Empty",
    description: "Dashed placeholder block for zero-data states.",
    component: "Empty",
    sourcePath: "ui/empty.tsx",
    preview: "empty",
    usage: `import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "rockin/ui"

export function Example() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">+</EmptyMedia>
        <EmptyTitle>No integrations yet</EmptyTitle>
        <EmptyDescription>Connect a tool to get started.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>Add your first integration</EmptyContent>
    </Empty>
  )
}`,
    importCode: `import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "rockin/ui"`,
    props: ["Empty", "EmptyHeader", "EmptyMedia", "EmptyTitle", "EmptyDescription", "EmptyContent"],
    group: "Primitives",
  },
  {
    slug: "input",
    title: "Input",
    description: "Text input with number-friendly defaults (decimal keypad, wheel blur).",
    component: "Input",
    sourcePath: "ui/input.tsx",
    preview: "input",
    usage: `import { Input } from "rockin/ui"

export function Example() {
  return <Input type="email" placeholder="ada@lovelace.dev" />
}`,
    importCode: `import { Input } from "rockin/ui"`,
    props: ["Input"],
    examples: [
      { name: "input-with-label", title: "With a label", description: "Pair with Label and a hint line for accessible forms." },
      { name: "input-states", title: "States", description: "Disabled, invalid (`aria-invalid`) and file inputs." },
    ],
    notes: `With \`type="number"\` the input forces \`inputMode="decimal"\`, hides native spinners and blurs on wheel so scrolling the page never mutates the value.`,
    group: "Forms",
  },
  {
    slug: "textarea",
    title: "Textarea",
    description: "Multi-line input that auto-grows with content via field-sizing.",
    component: "Textarea",
    sourcePath: "ui/textarea.tsx",
    preview: "textarea",
    usage: `import { Textarea } from "rockin/ui"

export function Example() {
  return <Textarea placeholder="Write a short changelog entry…" rows={4} />
}`,
    importCode: `import { Textarea } from "rockin/ui"`,
    props: ["Textarea"],
    group: "Forms",
  },
  {
    slug: "label",
    title: "Label",
    description: "Form label that dims automatically with disabled controls.",
    component: "Label",
    sourcePath: "ui/label.tsx",
    preview: "label",
    usage: `import { Input, Label } from "rockin/ui"

export function Example() {
  return (
    <div className="grid gap-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" />
    </div>
  )
}`,
    importCode: `import { Label } from "rockin/ui"`,
    props: ["Label"],
    group: "Forms",
  },
  {
    slug: "switch",
    title: "Switch",
    description: "Toggle control with two sizes, built on Base UI Switch.",
    component: "Switch",
    sourcePath: "ui/switch.tsx",
    preview: "switch",
    usage: `import { Label, Switch } from "rockin/ui"

export function Example() {
  const [on, setOn] = useState(true)
  return (
    <div className="flex items-center gap-3">
      <Switch id="autosave" checked={on} onCheckedChange={setOn} />
      <Label htmlFor="autosave">Auto-save drafts</Label>
    </div>
  )
}`,
    importCode: `import { Switch } from "rockin/ui"`,
    props: ["Switch"],
    examples: [{ name: "switch-sizes", title: "Sizes", description: "`sm` renders a compact 24px track." }],
    group: "Forms",
  },
  {
    slug: "checkbox",
    title: "Checkbox",
    description: "Binary check control — pass your own icon as children for the checked mark.",
    component: "Checkbox",
    sourcePath: "ui/checkbox.tsx",
    preview: "checkbox",
    usage: `import { Check } from "lucide-react"
import { Checkbox } from "rockin/ui"

export function Example() {
  const [checked, setChecked] = useState(true)
  return (
    <Checkbox checked={checked} onCheckedChange={setChecked}>
      <Check strokeWidth={4} className={checked ? "opacity-100" : "opacity-0"} />
    </Checkbox>
  )
}`,
    importCode: `import { Checkbox } from "rockin/ui"`,
    props: ["Checkbox"],
    examples: [{ name: "checkbox-multiple", title: "Checkbox list", description: "A controlled group of checkboxes with shared state." }],
    notes: `Children render inside the indicator — there is **no built-in check icon**. Pass any icon (e.g. a lucide \`Check\`) and toggle its opacity with the checked state.`,
    group: "Forms",
  },
  {
    slug: "radio-group",
    title: "Radio Group",
    description: "Single-choice selection with an item that renders its own dot.",
    component: "RadioGroup",
    sourcePath: "ui/radio-group.tsx",
    preview: "radio-group",
    usage: `import { RadioGroup, RadioGroupItem } from "rockin/ui"

export function Example() {
  const [plan, setPlan] = useState("pro")
  return (
    <RadioGroup value={plan} onValueChange={setPlan}>
      <RadioGroupItem value="hobby" />
      <RadioGroupItem value="pro" />
      <RadioGroupItem value="team" />
    </RadioGroup>
  )
}`,
    importCode: `import { RadioGroup, RadioGroupItem } from "rockin/ui"`,
    props: ["RadioGroup", "RadioGroupItem"],
    notes: `Do not pass children to \`RadioGroupItem\` — the selected dot is built in. The group is a vertical grid by default; override with \`className="flex …"\`.`,
    group: "Forms",
  },
  {
    slug: "select",
    title: "Select",
    description: "Native-feeling dropdown with groups, labels and separators, built on Base UI Select.",
    component: "Select",
    sourcePath: "ui/select.tsx",
    preview: "select",
    usage: `import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "rockin/ui"

export function Example() {
  const [value, setValue] = useState("next")
  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger className="w-52">
        <SelectValue placeholder="Pick a framework" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Frameworks</SelectLabel>
          <SelectItem value="next">Next.js</SelectItem>
          <SelectItem value="expo">Expo</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}`,
    importCode: `import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger, SelectValue } from "rockin/ui"`,
    parts: ["Select", "SelectTrigger", "SelectValue", "SelectContent", "SelectGroup", "SelectLabel", "SelectItem", "SelectSeparator"],
    props: ["SelectTrigger", "SelectValue", "SelectContent", "SelectGroup", "SelectLabel", "SelectItem", "SelectSeparator"],
    notes: `\`Select\` is a thin re-export of the Base UI root. \`SelectContent\` internally renders the portal, positioner and scroll buttons — never add your own. The popup width anchors to the trigger (min-w-36).`,
    group: "Forms",
  },
  {
    slug: "field",
    title: "Field",
    description: "Form field layout primitives — label, description, error, and orientation control.",
    component: "Field",
    sourcePath: "ui/field.tsx",
    preview: "field",
    usage: `import { Field, FieldDescription, FieldLabel } from "rockin/ui"
import { Textarea } from "rockin/ui"

export function Example() {
  return (
    <Field>
      <FieldLabel htmlFor="notes">Release notes</FieldLabel>
      <Textarea id="notes" rows={3} />
      <FieldDescription>Markdown supported.</FieldDescription>
    </Field>
  )
}`,
    importCode: `import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet, FieldTitle } from "rockin/ui"`,
    props: ["Field", "FieldGroup", "FieldLabel", "FieldTitle", "FieldDescription", "FieldError", "FieldSeparator", "FieldSet", "FieldLegend", "FieldContent"],
    notes: `\`Field\` accepts \`orientation="vertical" | "horizontal" | "responsive"\` — responsive flips at the \`@md/field-group\` container query, so wrap fields in \`FieldGroup\`. \`FieldError\` accepts an \`errors\` array and dedupes messages.`,
    group: "Forms",
  },
  {
    slug: "input-group",
    title: "Input Group",
    description: "Input with inline icons, buttons and text addons — focus states live on the wrapper.",
    component: "InputGroup",
    sourcePath: "ui/input-group.tsx",
    preview: "input-group",
    usage: `import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "rockin/ui"
import { Zap } from "lucide-react"

export function Example() {
  return (
    <InputGroup>
      <InputGroupAddon>
        <Zap className="size-4 text-muted-foreground" />
      </InputGroupAddon>
      <InputGroupInput placeholder="Search commands…" />
      <InputGroupAddon align="inline-end">
        <InputGroupButton>Go</InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  )
}`,
    importCode: `import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText, InputGroupTextarea } from "rockin/ui"`,
    props: ["InputGroup", "InputGroupAddon", "InputGroupButton", "InputGroupInput", "InputGroupText", "InputGroupTextarea"],
    examples: [{ name: "input-group-with-button", title: "With a submit button", description: "Addon buttons keep their own click behavior; clicking other addons focuses the input." }],
    notes: `\`InputGroupAddon\` supports \`align="inline-start" | "inline-end" | "block-start" | "block-end"\` — block alignments switch the group to a column for textareas. \`InputGroupButton\` uses its own size scale (\`xs\` default).`,
    group: "Forms",
  },
  {
    slug: "button-group",
    title: "Button Group",
    description: "Joins buttons, inputs and selects into a segmented control with automatic radius flattening.",
    component: "ButtonGroup",
    sourcePath: "ui/button-group.tsx",
    preview: "button-group",
    usage: `import { Button, ButtonGroup } from "rockin/ui"

export function Example() {
  return (
    <ButtonGroup>
      <Button variant="outline">Day</Button>
      <Button variant="outline">Week</Button>
      <Button variant="outline">Month</Button>
    </ButtonGroup>
  )
}`,
    importCode: `import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from "rockin/ui"`,
    props: ["ButtonGroup", "ButtonGroupText", "ButtonGroupSeparator"],
    group: "Forms",
  },
  {
    slug: "quantity",
    title: "Quantity Input",
    description: "Compact stepper (minus / value / plus) built on the Base UI NumberField.",
    component: "QuantityInput",
    sourcePath: "ui/quantity.tsx",
    preview: "quantity",
    usage: `import { QuantityInput } from "rockin/ui"

export function Example() {
  const [quantity, setQuantity] = useState(2)
  return (
    <QuantityInput
      value={quantity}
      onValueChange={(v) => setQuantity(v ?? 1)}
      min={1}
      max={12}
    />
  )
}`,
    importCode: `import { QuantityInput } from "rockin/ui"`,
    props: ["QuantityInput"],
    notes: "All Base UI NumberField root props pass through (`step`, `min`, `max`, `onValueChange`, …). The forwarded ref targets the inner input.",
    group: "Forms",
  },
  {
    slug: "otp",
    title: "OTP Input",
    description: "Animated one-time-code input with caret motion, error shake and success check.",
    component: "OTPInput",
    sourcePath: "ui/otp.tsx",
    preview: "otp",
    usage: `import { OTPInput } from "rockin/ui"

export function Example() {
  const [code, setCode] = useState("")
  return (
    <OTPInput
      value={code}
      onChange={setCode}
      onComplete={(value) => verify(value)}
      label="Verification code"
      hint="Sent to +1 ••• ••• 4821"
    />
  )
}`,
    importCode: `import { OTPInput } from "rockin/ui"`,
    props: ["OTPInput"],
    notes: `Status (\`idle\`, \`error\`, \`success\`) drives the animation: errors shake, success draws a check. Digits only — pasted values are stripped to numbers, and full keyboard navigation works. Exported easing/spring constants (\`SPRING_PRESS\`, \`EASE_DRAWER\`, …) are shared motion tokens.`,
    group: "Forms",
  },
  {
    slug: "input-otp",
    title: "Input OTP",
    description: "Classic shadcn-style OTP built on the input-otp library — composable slots and separators.",
    component: "InputOTP",
    sourcePath: "ui/input-otp.tsx",
    preview: "input-otp",
    usage: `import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "rockin/ui"

export function Example() {
  const [value, setValue] = useState("")
  return (
    <InputOTP maxLength={6} value={value} onChange={setValue}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  )
}`,
    importCode: `import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot, REGEXP_ONLY_DIGITS } from "rockin/ui"`,
    props: ["InputOTP", "InputOTPGroup", "InputOTPSlot", "InputOTPSeparator"],
    notes: `Prefer this over the animated variant when you need custom lengths or patterns (e.g. \`pattern={REGEXP_ONLY_DIGITS}\`). The group shows a destructive ring when an ancestor sets \`aria-invalid\`.`,
    group: "Forms",
  },
  {
    slug: "dialog",
    title: "Dialog",
    description: "Modal window with overlay, built-in close button and header/footer composition.",
    component: "Dialog",
    sourcePath: "ui/dialog.tsx",
    preview: "dialog",
    usage: `import { Button, Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "rockin/ui"

export function Example() {
  return (
    <Dialog>
      <DialogTrigger render={<Button />}>Invite teammate</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite a teammate</DialogTitle>
          <DialogDescription>They will get an email with a magic link.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button>Send invite</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}`,
    importCode: `import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger } from "rockin/ui"`,
    parts: ["Dialog", "DialogTrigger", "DialogContent", "DialogHeader", "DialogTitle", "DialogDescription", "DialogFooter", "DialogClose"],
    props: ["Dialog", "DialogTrigger", "DialogContent", "DialogHeader", "DialogTitle", "DialogDescription", "DialogFooter", "DialogClose"],
    notes: `\`DialogContent\` renders its own portal and overlay. A close button is built in; disable it with \`showCloseButton={false}\`. Always include \`DialogTitle\` — Base UI requires it for accessibility.`,
    group: "Overlays",
  },
  {
    slug: "alert-dialog",
    title: "Alert Dialog",
    description: "Confirmation modal with an icon slot and intent-styled action buttons.",
    component: "AlertDialog",
    sourcePath: "ui/alert-dialog.tsx",
    preview: "alert-dialog",
    usage: `import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "rockin/ui"

export function Example() {
  return (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="destructive" />}>Delete project</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this project?</AlertDialogTitle>
          <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Keep project</AlertDialogCancel>
          <AlertDialogAction variant="destructive">Delete forever</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}`,
    importCode: `import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogMedia, AlertDialogTitle, AlertDialogTrigger } from "rockin/ui"`,
    parts: ["AlertDialog", "AlertDialogTrigger", "AlertDialogContent", "AlertDialogHeader", "AlertDialogMedia", "AlertDialogTitle", "AlertDialogDescription", "AlertDialogFooter", "AlertDialogAction", "AlertDialogCancel"],
    props: ["AlertDialog", "AlertDialogTrigger", "AlertDialogContent", "AlertDialogHeader", "AlertDialogMedia", "AlertDialogTitle", "AlertDialogDescription", "AlertDialogFooter", "AlertDialogAction", "AlertDialogCancel"],
    notes: `\`AlertDialogMedia\` is an icon slot (a muted 40px square) that reflows the header next to the icon. \`AlertDialogAction\` is a styled Button — it does **not** close the dialog automatically; wire it to your mutation and close via the root's \`onOpenChange\`.`,
    group: "Overlays",
  },
  {
    slug: "drawer",
    title: "Drawer",
    description: "Swipeable sheet with snap points, nested stacking and a drag handle.",
    component: "Drawer",
    sourcePath: "ui/drawer.tsx",
    preview: "drawer",
    usage: `import { Button, Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "rockin/ui"

export function Example() {
  return (
    <Drawer>
      <DrawerTrigger render={<Button variant="outline" />}>Open drawer</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Filter deploys</DrawerTitle>
          <DrawerDescription>Only production from the last 7 days.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose render={<Button variant="ghost" />}>Cancel</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}`,
    importCode: `import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerSwipeHandle, DrawerTitle, DrawerTrigger } from "rockin/ui"`,
    parts: ["Drawer", "DrawerTrigger", "DrawerContent", "DrawerHeader", "DrawerTitle", "DrawerDescription", "DrawerFooter", "DrawerClose", "DrawerSwipeHandle"],
    props: ["Drawer", "DrawerTrigger", "DrawerContent", "DrawerHeader", "DrawerTitle", "DrawerDescription", "DrawerFooter", "DrawerClose", "DrawerSwipeHandle"],
    notes: `The root defaults to \`modal\` and \`swipeDirection="down"\`. Pass \`snapPoints\` for half/full sheets — the content composes portal, overlay, viewport and popup for you, and renders the swipe handle automatically for vertical directions (disable with \`showSwipeHandle={false}\`).`,
    group: "Overlays",
  },
  {
    slug: "popover",
    title: "Popover",
    description: "Anchored floating panel for rich hover/click content.",
    component: "Popover",
    sourcePath: "ui/popover.tsx",
    preview: "popover",
    usage: `import { Button, Popover, PopoverContent, PopoverTrigger } from "rockin/ui"

export function Example() {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>What's new</PopoverTrigger>
      <PopoverContent className="w-72">Release notes go here.</PopoverContent>
    </Popover>
  )
}`,
    importCode: `import { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger } from "rockin/ui"`,
    props: ["Popover", "PopoverTrigger", "PopoverContent", "PopoverHeader", "PopoverTitle", "PopoverDescription"],
    notes: `\`PopoverContent\` renders the portal and positioner; positioning props (\`side\`, \`align\`, \`sideOffset\`) live on it. Default width is fixed at \`w-72\` — override via className.`,
    group: "Overlays",
  },
  {
    slug: "tooltip",
    title: "Tooltip",
    description: "Hover/focus hint with an arrow and inverted colors.",
    component: "Tooltip",
    sourcePath: "ui/tooltip.tsx",
    preview: "tooltip",
    usage: `import { Tooltip, TooltipContent, TooltipTrigger } from "rockin/ui"

export function Example() {
  return (
    <Tooltip>
      <TooltipTrigger render={<Button variant="outline" size="icon-sm" />}>?</TooltipTrigger>
      <TooltipContent>3 unread notifications</TooltipContent>
    </Tooltip>
  )
}`,
    importCode: `import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "rockin/ui"`,
    props: ["Tooltip", "TooltipTrigger", "TooltipContent", "TooltipProvider"],
    notes: "Requires `TooltipProvider` mounted at the app root (`delay` defaults to 0). `Kbd` children get special treatment so shortcut hints align inside the bubble.",
    group: "Overlays",
  },
  {
    slug: "dropdown-menu",
    title: "Dropdown Menu",
    description: "Action menu with items, labels, check/radio items, submenus and keyboard shortcuts.",
    component: "DropdownMenu",
    sourcePath: "ui/dropdown-menu.tsx",
    preview: "dropdown-menu",
    usage: `import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "rockin/ui"

export function Example() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>Account</DropdownMenuTrigger>
      <DropdownMenuContent className="w-52">
        <DropdownMenuLabel>ada@rockstar.bio</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Profile <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem variant="destructive">Delete workspace</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}`,
    importCode: `import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "rockin/ui"`,
    parts: ["DropdownMenu", "DropdownMenuTrigger", "DropdownMenuContent", "DropdownMenuLabel", "DropdownMenuItem", "DropdownMenuCheckboxItem", "DropdownMenuRadioGroup", "DropdownMenuRadioItem", "DropdownMenuSeparator", "DropdownMenuShortcut", "DropdownMenuSub", "DropdownMenuSubTrigger", "DropdownMenuSubContent"],
    props: ["DropdownMenu", "DropdownMenuTrigger", "DropdownMenuContent", "DropdownMenuLabel", "DropdownMenuItem", "DropdownMenuCheckboxItem", "DropdownMenuRadioGroup", "DropdownMenuRadioItem", "DropdownMenuSeparator", "DropdownMenuShortcut", "DropdownMenuSub", "DropdownMenuSubTrigger", "DropdownMenuSubContent"],
    notes: `\`DropdownMenuItem\` supports \`variant="destructive"\` and \`inset\` (extra padding when leading icons are used). The content width anchors to the trigger. Checkbox and radio items render their own check indicator.`,
    group: "Overlays",
  },
  {
    slug: "accordion",
    title: "Accordion",
    description: "Expand/collapse sections with animated panels.",
    component: "Accordion",
    sourcePath: "ui/accordion.tsx",
    preview: "accordion",
    usage: `import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "rockin/ui"

export function Example() {
  const [open, setOpen] = useState<string[]>(["install"])
  return (
    <Accordion value={open} onValueChange={setOpen}>
      <AccordionItem value="install">
        <AccordionTrigger>How do I install rockin?</AccordionTrigger>
        <AccordionContent>bun add rockin</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}`,
    importCode: `import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "rockin/ui"`,
    props: ["Accordion", "AccordionItem", "AccordionTrigger", "AccordionContent"],
    notes: `The trigger auto-toggles its chevron from \`aria-expanded\`. \`AccordionTrigger\` also accepts \`endContent\` — extra content (like a badge) rendered outside the toggle.`,
    group: "Navigation & data",
  },
  {
    slug: "item",
    title: "Item",
    description: "Rich list-row primitives for people, files and settings entries.",
    component: "Item",
    sourcePath: "ui/item.tsx",
    preview: "item",
    usage: `import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from "rockin/ui"

export function Example() {
  return (
    <ItemGroup>
      <Item size="sm" variant="outline">
        <ItemMedia variant="icon">⚡</ItemMedia>
        <ItemContent>
          <ItemTitle>aurora-web</ItemTitle>
          <ItemDescription>Marketing site</ItemDescription>
        </ItemContent>
        <ItemActions>Live</ItemActions>
      </Item>
    </ItemGroup>
  )
}`,
    importCode: `import { Item, ItemActions, ItemContent, ItemDescription, ItemFooter, ItemGroup, ItemHeader, ItemMedia, ItemSeparator, ItemTitle } from "rockin/ui"`,
    props: ["Item", "ItemGroup", "ItemSeparator", "ItemMedia", "ItemContent", "ItemTitle", "ItemDescription", "ItemActions", "ItemHeader", "ItemFooter"],
    notes: `\`Item\` supports \`variant="default" | "outline" | "muted"\` and \`size="default" | "sm" | "xs"\` (propagated via \`data-size\`). \`ItemMedia variant="icon"\` renders a muted icon square; \`variant="image"\` fills the slot.`,
    group: "Navigation & data",
  },
  {
    slug: "carousel",
    title: "Carousel",
    description: "Embla-powered carousel with keyboard support and arrow buttons.",
    component: "Carousel",
    sourcePath: "ui/carousel.tsx",
    preview: "carousel",
    usage: `import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "rockin/ui"

export function Example() {
  return (
    <Carousel>
      <CarouselContent>
        {items.map((item) => (
          <CarouselItem key={item.id} className="basis-1/2">{item.content}</CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}`,
    importCode: `import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, useCarousel, type CarouselApi } from "rockin/ui"`,
    props: ["Carousel", "CarouselContent", "CarouselItem", "CarouselNext", "CarouselPrevious"],
    notes: `Item spacing is fixed at the \`-ml-4 / pl-4\` pair — change both together for a different gap. Grab the Embla instance with \`setApi\`. RTL layouts flip the chevrons automatically.`,
    group: "Navigation & data",
  },
  {
    slug: "command",
    title: "Command",
    description: "Command palette built on cmdk with a dialog mode and compact input group.",
    component: "Command",
    sourcePath: "ui/command.tsx",
    preview: "command",
    usage: `import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "rockin/ui"

export function Example() {
  const [open, setOpen] = useState(false)
  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Actions">
          <CommandItem onSelect={() => setOpen(false)}>Deploy preview</CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}`,
    importCode: `import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut, useCommandState } from "rockin/ui"`,
    props: ["Command", "CommandDialog", "CommandEmpty", "CommandGroup", "CommandInput", "CommandItem", "CommandList", "CommandSeparator", "CommandShortcut"],
    notes: `\`CommandDialog\` wraps the palette in a Dialog with an sr-only header. The list caps at \`max-h-72\` with a hidden scrollbar — selected items use \`data-selected\`.`,
    group: "Navigation & data",
  },
  {
    slug: "combobox",
    title: "Combobox",
    description: "Searchable select built on Base UI Combobox, with chips mode for multi-value.",
    component: "Combobox",
    sourcePath: "ui/combobox.tsx",
    preview: "combobox",
    usage: `import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "rockin/ui"

export function Example() {
  const [value, setValue] = useState<string | undefined>()
  return (
    <Combobox value={value} onValueChange={setValue}>
      <ComboboxInput placeholder="Pick a stack…" />
      <ComboboxContent>
        <ComboboxList>
          <ComboboxEmpty>Nothing found.</ComboboxEmpty>
          <ComboboxItem value="react">React</ComboboxItem>
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}`,
    importCode: `import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxGroup, ComboboxInput, ComboboxItem, ComboboxLabel, ComboboxList, ComboboxSeparator, ComboboxTrigger, ComboboxValue, useComboboxAnchor } from "rockin/ui"`,
    props: ["ComboboxInput", "ComboboxContent", "ComboboxList", "ComboboxItem", "ComboboxGroup", "ComboboxLabel", "ComboboxEmpty", "ComboboxTrigger", "ComboboxSeparator"],
    notes: `\`Combobox\` is a re-export of the Base UI root (supports \`multiple\` and collections). \`ComboboxInput\` accepts \`showTrigger\` / \`showClear\`; the chevron is auto-appended by the trigger.`,
    group: "Navigation & data",
  },
  {
    slug: "autocomplete",
    title: "Autocomplete",
    description: "Typeahead input built on Base UI Autocomplete with a scroll-area popup.",
    component: "Autocomplete",
    sourcePath: "ui/autocomplete.tsx",
    preview: "autocomplete",
    usage: `import { Autocomplete, AutocompleteEmpty, AutocompleteInput, AutocompleteItem, AutocompletePopup } from "rockin/ui"

export function Example() {
  const [value, setValue] = useState<string | undefined>()
  return (
    <Autocomplete value={value} onValueChange={setValue}>
      <AutocompleteInput placeholder="Assign to…" />
      <AutocompletePopup>
        <AutocompleteEmpty>No member found.</AutocompleteEmpty>
        <AutocompleteItem value="ada">Ada Lovelace</AutocompleteItem>
      </AutocompletePopup>
    </Autocomplete>
  )
}`,
    importCode: `import { Autocomplete, AutocompleteEmpty, AutocompleteGroup, AutocompleteGroupLabel, AutocompleteInput, AutocompleteItem, AutocompletePopup, AutocompleteSeparator, useAutocompleteFilter } from "rockin/ui"`,
    props: ["AutocompleteInput", "AutocompletePopup", "AutocompleteItem", "AutocompleteEmpty", "AutocompleteGroup", "AutocompleteGroupLabel", "AutocompleteSeparator", "AutocompleteTrigger", "AutocompleteClear"],
    notes: `\`AutocompleteInput\` has its own \`size\` scale (\`sm\` / \`default\` / \`lg\` or a number) and optional \`startAddon\`. Use \`useAutocompleteFilter\` for client-side matching.`,
    group: "Navigation & data",
  },
  {
    slug: "sortable",
    title: "Sortable",
    description: "Drag-and-drop reordering built on dnd-kit, with handle support and keyboard a11y.",
    component: "Sortable",
    sourcePath: "ui/sortable.tsx",
    preview: "sortable",
    usage: `import { Sortable, SortableContent, SortableItem, SortableItemHandle } from "rockin/ui"
import { GripVertical } from "lucide-react"

export function Example() {
  const [order, setOrder] = useState(["Design", "Build", "Ship"])
  return (
    <Sortable value={order} onValueChange={setOrder}>
      <SortableContent className="flex flex-col gap-2">
        {order.map((step) => (
          <SortableItem key={step} value={step} className="rounded-lg border px-3 py-2">
            {step}
            <SortableItemHandle><GripVertical className="size-4" /></SortableItemHandle>
          </SortableItem>
        ))}
      </SortableContent>
    </Sortable>
  )
}`,
    importCode: `import { Sortable, SortableContent, SortableItem, SortableItemHandle, SortableOverlay } from "rockin/ui"`,
    props: ["Sortable", "SortableContent", "SortableItem", "SortableItemHandle", "SortableOverlay"],
    notes: `\`orientation\` presets (\`vertical\`, \`horizontal\`, \`mixed\`) pick sensible modifiers and collision detection. Pass \`getItemValue\` for object arrays. Drag listeners attach to the whole item unless \`asHandle\` is set (or you use \`SortableItemHandle\`).`,
    group: "Navigation & data",
  },
  {
    slug: "message",
    title: "Message",
    description: "Server-safe chat layout primitives with start/end alignment.",
    component: "Message",
    sourcePath: "ui/message.tsx",
    preview: "chat",
    usage: `import { Message, MessageAvatar, MessageContent, MessageFooter, MessageGroup } from "rockin/ui"

export function Example() {
  return (
    <MessageGroup>
      <Message align="start">
        <MessageAvatar className="size-8">GH</MessageAvatar>
        <MessageContent>
          <p className="text-sm">Deploy finished — can you check?</p>
          <MessageFooter>Grace · 09:41</MessageFooter>
        </MessageContent>
      </Message>
    </MessageGroup>
  )
}`,
    importCode: `import { Message, MessageAvatar, MessageContent, MessageFooter, MessageGroup, MessageHeader } from "rockin/ui"`,
    props: ["Message", "MessageGroup", "MessageAvatar", "MessageContent", "MessageHeader", "MessageFooter"],
    notes: `Pure layout — no client JS. Pair with [Bubble](/docs/components/bubble) for the actual bubble chrome. \`MessageAvatar\` is a plain div: put initials or an image inside.`,
    group: "Chat",
  },
  {
    slug: "bubble",
    title: "Bubble",
    description: "Chat bubble chrome with variants, alignment and a floating reactions pill.",
    component: "Bubble",
    sourcePath: "ui/bubble.tsx",
    preview: "chat",
    usage: `import { Bubble, BubbleContent, BubbleGroup, BubbleReactions } from "rockin/ui"

export function Example() {
  return (
    <BubbleGroup>
      <Bubble variant="default" align="start">
        <BubbleContent>
          <p className="text-sm">Ship it 🚀</p>
        </BubbleContent>
        <BubbleReactions>👍 2</BubbleReactions>
      </Bubble>
    </BubbleGroup>
  )
}`,
    importCode: `import { Bubble, BubbleContent, BubbleGroup, BubbleReactions } from "rockin/ui"`,
    props: ["Bubble", "BubbleContent", "BubbleGroup", "BubbleReactions"],
    notes: `Variants: \`default\`, \`secondary\`, \`muted\`, \`tinted\`, \`outline\`, \`ghost\`, \`destructive\`. \`ghost\` removes the bubble chrome for full-width content (images, code). Alignment is driven by \`data-align\` and pairs with the Message group.`,
    group: "Chat",
  },
  {
    slug: "message-scroller",
    title: "Message Scroller",
    description: "Auto-scrolling chat viewport with scroll-to-start/end buttons.",
    component: "MessageScroller",
    sourcePath: "ui/message-scroller.tsx",
    usage: `import { MessageScroller, MessageScrollerButton, MessageScrollerContent, MessageScrollerItem, MessageScrollerProvider, MessageScrollerViewport } from "rockin/ui"

export function Chat() {
  return (
    <MessageScrollerProvider>
      <MessageScroller className="h-dvh">
        <MessageScrollerViewport>
          <MessageScrollerContent>
            {messages.map((m) => (
              <MessageScrollerItem key={m.id}>{m.body}</MessageScrollerItem>
            ))}
          </MessageScrollerContent>
          <MessageScrollerButton direction="end" />
        </MessageScrollerViewport>
      </MessageScroller>
    </MessageScrollerProvider>
  )
}`,
    importCode: `import { MessageScroller, MessageScrollerButton, MessageScrollerContent, MessageScrollerItem, MessageScrollerProvider, MessageScrollerViewport, useMessageScroller, useMessageScrollerScrollable, useMessageScrollerVisibility } from "rockin/ui"`,
    props: ["MessageScrollerProvider", "MessageScroller", "MessageScrollerViewport", "MessageScrollerContent", "MessageScrollerItem", "MessageScrollerButton"],
    notes: `Items use \`content-visibility: auto\` for performance with long histories. The floating button shows/hides itself based on scroll position (\`data-active\`); mark the newest item with \`scrollAnchor\`.`,
    group: "Chat",
  },
  {
    slug: "dock",
    title: "Dock",
    description: "macOS-style floating dock of icon buttons with hover tooltips and springy motion.",
    component: "Dock",
    sourcePath: "ui/dock.tsx",
    preview: "dock",
    usage: `import { Dock } from "rockin/ui"
import { Home, Search, Settings } from "lucide-react"

export function Example() {
  const items = [
    { icon: Home, label: "Home", onClick: () => {} },
    { icon: Search, label: "Search", onClick: () => {} },
    { icon: Settings, label: "Settings", onClick: () => {} },
  ]
  return <Dock items={items} className="h-40" />
}`,
    importCode: `import { Dock } from "rockin/ui"`,
    props: ["Dock"],
    notes: `The container reserves a fixed height (h-64 default) — override with \`className\`. Icons scale and lift on hover via \`motion/react\`; taps get press feedback.`,
    group: "Motion & fun",
  },
  {
    slug: "dashed-separator",
    title: "Dashed Separator",
    description: "Responsive dashed divider that recomputes its dash count as the container resizes.",
    component: "DashedSeparator",
    sourcePath: "ui/dashed.tsx",
    preview: "dashed-separator",
    usage: `import { DashedSeparator } from "rockin/ui"

export function Example() {
  return <DashedSeparator className="my-4 text-border" />
}`,
    importCode: `import { DashedSeparator } from "rockin/ui"`,
    props: ["DashedSeparator"],
    notes: "Color comes from `currentColor` (default `text-border`). Tune `dashWidth`, `minimumGap` and `thickness` (px).",
    group: "Motion & fun",
  },
  {
    slug: "jelly",
    title: "Jelly",
    description: "The rockin jelly mascot — inline mini blob, mood-driven mascot and empty states.",
    component: "JellyMini",
    sourcePath: "ui/jelly.tsx",
    preview: "jelly",
    usage: `import { JellyAction, JellyGroup, JellyMascot, JellyMini } from "rockin/ui"

export function Example() {
  return (
    <JellyGroup mood="happy" speech="Hi, I'm Jelly!">
      <div className="flex flex-col items-center gap-4">
        <JellyMascot className="w-24" />
        <div className="flex gap-1.5">
          <JellyAction mood="curious" size="xs" variant="outline">curious</JellyAction>
          <JellyAction mood="love" size="xs" variant="outline">love</JellyAction>
        </div>
      </div>
    </JellyGroup>
  )
}`,
    importCode: `import { JellyAction, JellyBlob, JellyEmpty, JellyGroup, JellyLink, JellyMascot, JellyMini, useJellyMood } from "rockin/ui"`,
    props: ["JellyBlob", "JellyEmpty", "JellyGroup", "JellyAction", "JellyLink", "JellyMascot", "JellyMini"],
    notes: `Moods: \`neutral\`, \`happy\`, \`sad\`, \`angry\`, \`hmm\`, \`sideEye\`, \`password\`, \`curious\`, \`surprised\`, \`sleepy\`, \`shy\`, \`love\`, \`wave\`.

The mascot demos itself: put actions inside a \`JellyGroup\` (or a \`JellyMascot\`) and give each a \`mood\` — \`JellyAction\` and \`JellyLink\` preview that mood on hover and focus, speech bubble included (\`speech\` prop on the group). Use standalone \`JellyMini\` for inline moods and \`JellyEmpty\` for empty states. Everything is SSR-safe — blobs render nothing until mounted (reserve size with classes).`,
    group: "Motion & fun",
  },
  {
    slug: "toaster",
    title: "Toaster",
    description: "Gooey toast viewport wired to your theme — mount once, call toast() anywhere.",
    component: "Toaster",
    sourcePath: "ui/sonner.tsx",
    preview: "toast",
    usage: `import { Toaster } from "rockin/ui"

// Mount once in your root layout
export function Layout({ children }) {
  return (
    <>
      {children}
      <Toaster />
    </>
  )
}`,
    importCode: `import { gooeyToast, Toaster } from "rockin/ui"`,
    props: ["Toaster"],
    examples: [
      { name: "toast", title: "Calling toasts", description: "Use the `gooeyToast` API for success states and promises with loading states." },
    ],
    notes: `Import the trigger function as \`import { gooeyToast as toast } from "rockin/ui"\`. The viewport defaults to \`bottom-right\` with the close button at top-left; \`theme\` follows next-themes automatically. Rich colors and positioning can be overridden per Toaster.`,
    group: "Motion & fun",
  },
  {
    slug: "image",
    title: "Image",
    description: "Next.js Image with a loading skeleton, fade-in and a jelly fallback for failures.",
    component: "Image",
    sourcePath: "ui/image.tsx",
    preview: "image-fallback",
    usage: `import { Image } from "rockin/ui"

export function Example() {
  return (
    <Image
      src="https://example.com/photo.jpg"
      alt="Product photo"
      width={640}
      height={360}
      wrapper="w-full rounded-xl border"
      className="h-48 w-full object-cover"
    />
  )
}`,
    importCode: `import { Image } from "rockin/ui"`,
    props: ["Image"],
    notes: "`src` accepts `null` — the fallback (a curious JellyMini by default, override with `fallback`) renders until an image loads successfully. `loading=\"eager\"` implies preloading and high fetch priority.",
    group: "Motion & fun",
  },
  {
    slug: "apple-hello",
    title: "Apple Hello",
    description: "Hand-drawn “hello” handwriting animation cycling through languages.",
    component: "Apple",
    sourcePath: "ui/apple/index.tsx",
    usage: `import { Apple } from "rockin/ui"

export function Hero() {
  return <Apple className="h-24" durationScale={1.2} />
}`,
    importCode: `import { Apple } from "rockin/ui"`,
    notes: "Self-cycling: when one language finishes drawing, the next starts. `durationScale` below 1 speeds the animation up, above 1 slows it down. Stroke inherits `currentColor`.",
    group: "Motion & fun",
  },
  {
    slug: "animated-div",
    title: "Animated Div",
    description: "motion.div with whileInView reveal, staggered children and mobile-specific variants.",
    component: "AnimatedDiv",
    sourcePath: "ui/farmer/div.tsx",
    usage: `import { AnimatedDiv } from "rockin/ui"

export function Example() {
  return (
    <AnimatedDiv>
      <motion.div variants={itemVariants}>Child one</motion.div>
      <motion.div variants={itemVariants}>Child two</motion.div>
    </AnimatedDiv>
  )
}`,
    importCode: `import { AnimatedDiv } from "rockin/ui"`,
    notes: "Children animate when they are motion components with matching `variants`. Below 768px `mobileVariants` replaces `variants`; `infinity` re-triggers the reveal on every scroll into view.",
    group: "Motion & fun",
  },
  {
    slug: "filters",
    title: "Filters",
    description: "Query-builder filter bar with typed fields, operators and i18n.",
    component: "Filters",
    sourcePath: "ui/reui/filters.tsx",
    usage: `import { Filters, FiltersContent, createFilter } from "rockin/ui"

export function Example() {
  const [filters, setFilters] = useState([])
  const fields = [
    { key: "status", label: "Status", type: "select", options: [
      { value: "active", label: "Active" },
      { value: "draft", label: "Draft" },
    ] },
    { key: "name", label: "Name", type: "text" },
  ]
  return (
    <Filters filters={filters} fields={fields} onChange={setFilters} />
  )
}`,
    importCode: `import { Filters, FiltersContent, createFilter, createFilterGroup } from "rockin/ui"`,
    props: ["Filters", "FiltersContent"],
    notes: "Field types: `select`, `multiselect`, `text`, `custom`, `separator` — each supports custom operators, validation and async `loadOptions`. Marked `use no memo`: don't wrap in memoizing HOCs.",
    group: "Navigation & data",
  },
  {
    slug: "chart",
    title: "Chart",
    description: "Recharts theming layer — ChartContainer injects per-series CSS variables.",
    component: "ChartContainer",
    sourcePath: "ui/chart.tsx",
    usage: `import { Area, AreaChart, XAxis } from "recharts"
import { ChartContainer, ChartTooltipContent } from "rockin/ui"

const config = {
  revenue: { label: "Revenue", color: "var(--chart-1)" },
} satisfies ChartConfig

export function Example({ data }) {
  return (
    <ChartContainer config={config} className="h-48 w-full">
      <AreaChart data={data}>
        <XAxis dataKey="month" />
        <Area dataKey="revenue" stroke="var(--color-revenue)" fill="var(--color-revenue)" />
      </AreaChart>
    </ChartContainer>
  )
}`,
    importCode: `import { ChartContainer, ChartLegendContent, ChartStyle, ChartTooltipContent, useChart, type ChartConfig } from "rockin/ui"`,
    props: ["ChartContainer", "ChartTooltipContent", "ChartLegendContent", "ChartStyle"],
    notes: "Each key in `ChartConfig` becomes a `--color-<key>` CSS variable inside the container, so charts match your theme on light and dark. Wrap Recharts components in `ChartContainer` and use `ChartTooltipContent` for themed tooltips.",
    group: "Navigation & data",
  },
  {
    slug: "native-app-bridge",
    title: "Native App Bridge",
    description: "Renders nothing — syncs Capacitor status bar/theme and handles deep links on native.",
    component: "NativeAppBridge",
    sourcePath: "ui/bridge.tsx",
    usage: `import { NativeAppBridge } from "rockin/ui"

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <NativeAppBridge />
        {children}
      </body>
    </html>
  )
}`,
    importCode: `import { NativeAppBridge } from "rockin/ui"`,
    notes: "No-ops on web. On native it sets `data-native*` attributes on `<html>`, syncs the Capacitor status bar with next-themes, and routes `kdpower://open` style deep links through the Next.js router. App Router only.",
    group: "Motion & fun",
    hidden: true,
  },
]

const mdxString = (s: string) => `'${s.replace(/'/g, "\\'")}'`

function toMdx(doc: ComponentDocConfig): string {
  const lines: string[] = []
  lines.push("---")
  lines.push(`title: ${JSON.stringify(doc.title)}`)
  lines.push(`description: ${JSON.stringify(doc.description)}`)
  lines.push(`component: ${doc.component}`)
  lines.push(`source: ${doc.sourcePath}`)
  lines.push("---")
  lines.push("")

  if (doc.preview) {
    lines.push(`<ComponentPreview name="${doc.preview}" />`)
    lines.push("")
  }

  lines.push("## Usage")
  lines.push("")
  lines.push("```tsx")
  lines.push(doc.usage)
  lines.push("```")
  lines.push("")

  lines.push("## Anatomy")
  lines.push("")
  const parts = doc.parts ?? [doc.component]
  const partsList = parts.map((p) => `"${p}"`).join(", ")
  lines.push(`<Anatomy importCode={${mdxString(doc.importCode)}} parts={[${partsList}]} sourcePath="${doc.sourcePath}" />`)
  lines.push("")

  if (doc.examples && doc.examples.length > 0) {
    lines.push("## Examples")
    lines.push("")
    for (const ex of doc.examples) {
      const desc = ex.description ? ` description=${mdxString(ex.description)}` : ""
      lines.push(`<ComponentExample name="${ex.name}" title=${mdxString(ex.title)}${desc} />`)
      lines.push("")
    }
  }

  if (doc.notes) {
    lines.push(doc.notes)
    lines.push("")
  }

  if (doc.props || doc.manualProps) {
    lines.push("## API Reference")
    lines.push("")
    if (doc.props && doc.props.length > 1) {
      for (const name of doc.props) {
        lines.push(`### ${name}`)
        lines.push("")
        lines.push(`<PropsTable component="${name}" />`)
        lines.push("")
      }
    } else if (doc.props && doc.props.length === 1) {
      lines.push(`<PropsTable component="${doc.props[0]}" />`)
      lines.push("")
    } else if (doc.manualProps) {
      lines.push("<PropsTable")
      lines.push("  props={[")
      for (const p of doc.manualProps) {
        const fields = [
          `name: ${mdxString(p.name)}`,
          `type: ${mdxString(p.type)}`,
          p.default ? `default: ${mdxString(p.default)}` : null,
          p.description ? `description: ${mdxString(p.description)}` : null,
        ].filter(Boolean)
        lines.push(`    { ${fields.join(", ")} },`)
      }
      lines.push("  ]}")
      lines.push("/>")
      lines.push("")
    }
  }

  return lines.join("\n")
}

fs.rmSync(CONTENT_DIR, { recursive: true, force: true })
fs.mkdirSync(CONTENT_DIR, { recursive: true })

for (const doc of DOCS) {
  fs.writeFileSync(path.join(CONTENT_DIR, `${doc.slug}.mdx`), toMdx(doc))
}

// Keep every component in one predictable, flat `/docs/components/` section.
fs.writeFileSync(
  path.join(CONTENT_DIR, "meta.json"),
  JSON.stringify(
    {
      title: "Components",
      defaultOpen: true,
      pages: DOCS.filter((d) => !d.hidden)
        .sort((a, b) => a.title.localeCompare(b.title))
        .map((d) => d.slug),
    },
    null,
    2
  ) + "\n"
)

console.log(`Wrote ${DOCS.length} component pages -> content/docs/components/`)
