"use client"

import * as button from "./button"
import * as badge from "./badge"
import * as card from "./card"
import * as input from "./input"
import * as separator from "./separator"
import * as formControls from "./form-controls"
import * as dataDisplay from "./data-display"
import * as overlays from "./overlays"
import * as menus from "./menus"
import * as pickers from "./pickers"
import * as fancy from "./fancy"
import * as composites from "./composites"
import * as pickersAdvanced from "./pickers-advanced"
import * as otpInput from "./otp-input"
import * as icons from "./icons"
import * as image from "./image"

/** `ButtonDemo` -> "button", `QRCodeDemo` -> "qrcode", `OTPDemo` -> "otp" */
function toDemoKey(name: string): string {
  return name
    .replace(/Demo$/, "")
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .toLowerCase()
}

const raw: Record<string, unknown> = {
  ...button,
  ...badge,
  ...card,
  ...input,
  ...separator,
  ...formControls,
  ...dataDisplay,
  ...overlays,
  ...menus,
  ...pickers,
  ...fancy,
  ...composites,
  ...pickersAdvanced,
  ...otpInput,
  ...icons,
  ...image,
}

export const demos = Object.fromEntries(
  Object.entries(raw)
    .filter(([, value]) => typeof value === "function")
    .map(([key, value]) => [toDemoKey(key), value])
) as Record<string, React.ComponentType>

export type DemoName = keyof typeof demos

export function getDemo(name: string): React.ComponentType | undefined {
  return demos[name]
}
