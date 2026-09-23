"use client"

import { useId, useState } from "react"

import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "rockin/ui"

export function InputOTPDemo() {
  const [value, setValue] = useState("")
  const id = useId()
  return (
    <div className="flex flex-col items-center gap-3">
      <InputOTP id={id} maxLength={6} value={value} onChange={setValue}>
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
      <p className="text-xs text-muted-foreground">Paste or type the 6-digit code</p>
    </div>
  )
}
