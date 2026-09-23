import { Input, Label, Textarea } from "rockin/ui"

export function InputDemo() {
  return <Input type="email" placeholder="ada@lovelace.dev" className="max-w-xs" />
}

export function InputWithLabelDemo() {
  return (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor="workspace">Workspace URL</Label>
      <Input id="workspace" placeholder="rockstar.bio/acme" />
      <p className="text-xs text-muted-foreground">This is your public workspace address.</p>
    </div>
  )
}

export function InputStatesDemo() {
  return (
    <div className="grid w-full max-w-sm gap-3">
      <Input placeholder="Disabled" disabled />
      <Input defaultValue="Invalid value" aria-invalid />
      <Input type="file" />
    </div>
  )
}

export function TextareaDemo() {
  return <Textarea placeholder="Write a short changelog entry…" className="max-w-md" />
}

export function LabelDemo() {
  return (
    <div className="flex items-center gap-2">
      <Label htmlFor="terms" className="font-normal">
        I agree to the processing of my data
      </Label>
    </div>
  )
}
