"use client"

import { useMounted } from "#hooks/index"
import {
  JellyBlobMascot,
  type JellyBlobMascotProps,
  type JellyBlobMood,
} from "feral-blob"
import "feral-blob/blob.css"
import { cn } from "../lib"

export {
  BlobSpeech,
  JellyBlobMascot,
  type JellyBlobMascotProps,
  type JellyBlobMood,
} from "feral-blob"

export function JellyBlob({ ...props }: JellyBlobMascotProps) {
  return (
    <span className="inline-block">
      <JellyBlobMascot
        {...props}
        className={cn("h-auto w-full", props.className)}
      />
    </span>
  )
}

const MOOD_GAZE: Record<JellyBlobMood, { x: number; y: number }> = {
  neutral: { x: 0, y: 8 },
  happy: { x: 18, y: -6 },
  sad: { x: 0, y: 14 },
  angry: { x: 10, y: 2 },
  hmm: { x: 10, y: -4 },
  sideEye: { x: 30, y: 0 },
  password: { x: -14, y: 16 },
  curious: { x: 18, y: -8 },
  surprised: { x: 0, y: -10 },
  sleepy: { x: 0, y: 14 },
  shy: { x: -12, y: 4 },
  love: { x: 0, y: -4 },
  wave: { x: 20, y: -8 },
}

export function JellyMini({
  mood = "neutral",
  className,
}: {
  mood?: JellyBlobMood
  className?: string
}) {
  const { mounted } = useMounted()
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex size-5 shrink-0 items-center justify-center select-none",
        className
      )}
    >
      {mounted ? (
        <JellyBlobMascot
          mood={mood}
          gaze={MOOD_GAZE[mood]}
          className="h-auto w-full"
        />
      ) : null}
    </span>
  )
}
