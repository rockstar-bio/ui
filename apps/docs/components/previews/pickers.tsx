"use client"

import * as React from "react"

import { gooeyToast as toast } from "rockin"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "rockin/ui"

const frameworks = ["Next.js", "Expo", "React Router", "TanStack Start"]

export function SelectDemo() {
  const [value, setValue] = React.useState<string>(frameworks[0])
  return (
    <Select value={value} onValueChange={(next) => setValue(next ?? frameworks[0])}>
      <SelectTrigger className="w-52">
        <SelectValue placeholder="Pick a framework" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>React meta-frameworks</SelectLabel>
          {frameworks.map((framework) => (
            <SelectItem key={framework} value={framework}>
              {framework}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export function AccordionDemo() {
  const [open, setOpen] = React.useState<string[]>(["install"])
  return (
    <Accordion className="w-full max-w-md" value={open} onValueChange={setOpen}>
      <AccordionItem value="install">
        <AccordionTrigger>How do I install rockin?</AccordionTrigger>
        <AccordionContent>
          Run <code className="rounded bg-muted px-1 py-0.5 text-xs">bun add rockin</code>, import the stylesheet
          once, then import any component from <code className="rounded bg-muted px-1 py-0.5 text-xs">rockin/ui</code>.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="styles">
        <AccordionTrigger>Does it need a Tailwind config?</AccordionTrigger>
        <AccordionContent>
          No. rockin uses Tailwind CSS v4 CSS-first configuration — the stylesheet exposes every design token as a
          CSS variable you can override.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="license">
        <AccordionTrigger>Is it free?</AccordionTrigger>
        <AccordionContent>Yes — MIT licensed, shared across Rock Star projects.</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export function ToastDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Button
        variant="outline"
        onClick={() =>
          toast.success("Deployed to production", {
            description: "aurora-web · commit a1b2c3d",
          })
        }
      >
        Success toast
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.promise(new Promise((resolve) => setTimeout(resolve, 1500)), {
            loading: "Rolling back…",
            success: "Rolled back to a1b2c3d",
            error: "Rollback failed",
          })
        }
      >
        Promise toast
      </Button>
    </div>
  )
}
