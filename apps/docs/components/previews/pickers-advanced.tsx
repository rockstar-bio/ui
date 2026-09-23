"use client"

import { GripVertical as GripVerticalIcon, Search } from "lucide-react"
import { useState } from "react"

import {
  Autocomplete,
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteItem,
  AutocompletePopup,
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
  Field,
  FieldDescription,
  FieldLabel,
  Sortable,
  SortableContent,
  SortableItem,
  SortableItemHandle,
  Textarea,
} from "rockin/ui"

const members = ["Ada Lovelace", "Grace Hopper", "Alan Turing", "Katherine Johnson", "Barbara Liskov"]

export function AutocompleteDemo() {
  const [value, setValue] = useState<string | undefined>(undefined)
  return (
    <Autocomplete value={value} onValueChange={(next) => setValue(next ?? undefined)}>
      <AutocompleteInput placeholder="Assign to…" className="w-56" />
      <AutocompletePopup>
        <AutocompleteEmpty>No member found.</AutocompleteEmpty>
        {members.map((member) => (
          <AutocompleteItem key={member} value={member}>
            {member}
          </AutocompleteItem>
        ))}
      </AutocompletePopup>
    </Autocomplete>
  )
}

export function ComboboxDemo() {
  const [value, setValue] = useState<string | undefined>(undefined)
  return (
    <Combobox value={value} onValueChange={(next) => setValue(next ?? undefined)}>
      <ComboboxInput placeholder="Pick a stack…" className="w-56" />
      <ComboboxContent>
        <ComboboxList>
          <ComboboxEmpty>Nothing found.</ComboboxEmpty>
          {["react", "next", "tailwind", "expo", "capacitor"].map((stack) => (
            <ComboboxItem key={stack} value={stack}>
              {stack}
            </ComboboxItem>
          ))}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}

export function CommandDemo() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-muted-foreground hover:text-foreground text-sm underline decoration-dashed underline-offset-4"
      >
        Open command palette
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search…" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Actions">
            <CommandItem onSelect={() => setOpen(false)}>
              <Search className="size-4" /> Deploy preview
              <CommandShortcut>⌘⏎</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={() => setOpen(false)}>Rollback release</CommandItem>
            <CommandItem onSelect={() => setOpen(false)}>Invite teammate</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}

export function SortableDemo() {
  const [order, setOrder] = useState(["Requirements", "Design", "Build", "QA", "Ship"])
  return (
    <div className="w-full max-w-xs">
      <Sortable value={order} onValueChange={setOrder}>
        <SortableContent className="flex flex-col gap-2">
          {order.map((step) => (
            <SortableItem
              key={step}
              value={step}
              className="flex items-center justify-between rounded-lg border bg-background px-3 py-2 text-sm"
            >
              {step}
              <SortableItemHandle>
                <GripVerticalIcon className="size-4 text-muted-foreground" />
              </SortableItemHandle>
            </SortableItem>
          ))}
        </SortableContent>
      </Sortable>
    </div>
  )
}

export function FieldDemo() {
  return (
    <Field className="w-full max-w-sm">
      <FieldLabel htmlFor="release-notes">Release notes</FieldLabel>
      <Textarea id="release-notes" placeholder="What shipped in this release?" rows={3} />
      <FieldDescription>Markdown supported. Shown to everyone who watches the repo.</FieldDescription>
    </Field>
  )
}
