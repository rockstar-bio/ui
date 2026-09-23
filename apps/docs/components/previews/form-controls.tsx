"use client"

import { Check } from "lucide-react"
import { useState } from "react"

import { Checkbox, Kbd, KbdGroup, Label, RadioGroup, RadioGroupItem, Switch } from "rockin/ui"

export function KbdDemo() {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        Press <Kbd>⌘</Kbd> <Kbd>K</Kbd> to open the command palette
      </div>
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <Kbd>Shift</Kbd>
        <Kbd>P</Kbd>
      </KbdGroup>
    </div>
  )
}

export function SwitchDemo() {
  const [autoSave, setAutoSave] = useState(true)
  return (
    <div className="flex items-center gap-3">
      <Switch id="autosave" checked={autoSave} onCheckedChange={setAutoSave} />
      <Label htmlFor="autosave">Auto-save drafts</Label>
    </div>
  )
}

export function SwitchSizesDemo() {
  const [on, setOn] = useState(true)
  return (
    <div className="flex items-center gap-4">
      <Switch size="sm" checked={on} onCheckedChange={setOn} aria-label="Small switch" />
      <Switch checked={on} onCheckedChange={setOn} aria-label="Default switch" />
    </div>
  )
}

export function CheckboxDemo() {
  const [checked, setChecked] = useState(true)
  return (
    <div className="flex items-center gap-2">
      <Checkbox id="remember" checked={checked} onCheckedChange={setChecked}>
        <Check strokeWidth={4} className={checked ? "opacity-100" : "opacity-0"} />
      </Checkbox>
      <Label htmlFor="remember">Remember this device</Label>
    </div>
  )
}

export function CheckboxMultipleDemo() {
  const [stack, setStack] = useState<string[]>(["react", "tailwind"])
  const items = [
    { id: "react", label: "React 19" },
    { id: "tailwind", label: "Tailwind CSS v4" },
    { id: "baseui", label: "Base UI" },
  ]
  return (
    <div className="flex flex-col gap-2.5">
      {items.map((item) => {
        const selected = stack.includes(item.id)
        return (
          <label key={item.id} className="flex items-center gap-2 text-sm">
            <Checkbox
              checked={selected}
              onCheckedChange={(v) =>
                setStack((prev) => (v === true ? [...prev, item.id] : prev.filter((id) => id !== item.id)))
              }
            >
              <Check strokeWidth={4} className={selected ? "opacity-100" : "opacity-0"} />
            </Checkbox>
            {item.label}
          </label>
        )
      })}
    </div>
  )
}

export function RadioGroupDemo() {
  const [plan, setPlan] = useState<string>("pro")
  const plans = [
    { id: "hobby", label: "Hobby", hint: "For side projects — free forever" },
    { id: "pro", label: "Pro", hint: "Unlimited projects, priority builds" },
    { id: "team", label: "Team", hint: "Shared workspaces and audit logs" },
  ]
  return (
    <RadioGroup value={plan} onValueChange={setPlan} className="w-full max-w-xs">
      {plans.map((p) => (
        <label
          key={p.id}
          className="flex items-start gap-3 rounded-xl border p-3 text-sm has-data-[state=checked]:border-primary"
        >
          <RadioGroupItem value={p.id} className="mt-0.5" />
          <span>
            <span className="block font-medium">{p.label}</span>
            <span className="block text-xs text-muted-foreground">{p.hint}</span>
          </span>
        </label>
      ))}
    </RadioGroup>
  )
}
