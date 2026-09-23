"use client"

import { Bell } from "lucide-react"
import { useState } from "react"

import { Button, Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, Input, Label, Popover, PopoverContent, PopoverTitle, PopoverTrigger, Tooltip, TooltipContent, TooltipTrigger } from "rockin/ui"

export function DialogDemo() {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant="outline" />}>Invite teammate</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite a teammate</DialogTitle>
          <DialogDescription>They will get an email with a magic link to join your workspace.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-2 py-2">
          <Label htmlFor="invite-email">Email</Label>
          <Input id="invite-email" type="email" placeholder="grace@navy.mil" />
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setOpen(false)}>Send invite</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>What's new</PopoverTrigger>
      <PopoverContent className="w-72">
        <PopoverTitle>Release 0.0.4</PopoverTitle>
        <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
          <li>• New Drawer snap points</li>
          <li>• Combobox chips mode</li>
          <li>• Gooey toasts with theme sync</li>
        </ul>
      </PopoverContent>
    </Popover>
  )
}

export function TooltipDemo() {
  return (
    <Tooltip>
      <TooltipTrigger render={<Button variant="outline" size="icon-sm" aria-label="Notifications" />}>
        <Bell />
      </TooltipTrigger>
      <TooltipContent>3 unread notifications</TooltipContent>
    </Tooltip>
  )
}
