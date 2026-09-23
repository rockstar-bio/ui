"use client"

import { ThumbsUp, Zap } from "lucide-react"
import { useState } from "react"

import {
  Button,
  ButtonGroup,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
  Kbd,
  OTPInput,
  QuantityInput,
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  Bubble,
  BubbleContent,
  BubbleGroup,
  BubbleReactions,
} from "rockin/ui"

export function ButtonGroupDemo() {
  const [view, setView] = useState("board")
  return (
    <ButtonGroup aria-label="Board view">
      {["board", "list", "timeline"].map((v) => (
        <Button
          key={v}
          size="sm"
          variant={view === v ? "default" : "ghost"}
          aria-pressed={view === v}
          onClick={() => setView(v)}
          className="capitalize"
        >
          {v}
        </Button>
      ))}
    </ButtonGroup>
  )
}

export function InputGroupDemo() {
  return (
    <InputGroup className="w-full max-w-sm">
      <InputGroupAddon>
        <Zap data-icon className="size-4 text-muted-foreground" />
      </InputGroupAddon>
      <InputGroupInput placeholder="Search commands…" />
      <InputGroupAddon align="inline-end">
        <Kbd>⌘K</Kbd>
      </InputGroupAddon>
    </InputGroup>
  )
}

export function InputGroupWithButtonDemo() {
  const [value, setValue] = useState("")
  return (
    <InputGroup className="w-full max-w-sm">
      <InputGroupInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="https://github.com/rockstar-bio/ui"
      />
      <InputGroupAddon align="inline-end">
        <InputGroupButton size="sm" variant="default" disabled={!value}>
          Clone
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  )
}

export function QuantityDemo() {
  const [quantity, setQuantity] = useState(2)
  return (
    <div className="flex items-center gap-4">
      <QuantityInput value={quantity} onValueChange={(v) => setQuantity(v ?? 1)} min={1} max={12} />
      <span className="text-sm text-muted-foreground">× $96.00 = ${quantity * 96}.00</span>
    </div>
  )
}

export function OTPDemo() {
  const [value, setValue] = useState("")
  return (
    <OTPInput
      value={value}
      onChange={setValue}
      onComplete={(code) => console.log("complete", code)}
      label="Verification code"
      hint="Sent to +1 ••• ••• 4821"
    />
  )
}

const projects = [
  { name: "aurora-web", description: "Marketing site · production", progress: "Live" },
  { name: "kdpower-mobile", description: "Capacitor app · internal", progress: "Building" },
  { name: "rockin-docs", description: "This documentation site", progress: "Live" },
]

export function ItemDemo() {
  return (
    <ItemGroup className="w-full max-w-sm">
      {projects.map((project) => (
        <Item key={project.name} size="sm" variant="outline">
          <ItemMedia variant="icon">
            <Zap className="size-4" />
          </ItemMedia>
          <ItemContent>
            <ItemTitle className="font-mono text-sm">{project.name}</ItemTitle>
            <ItemDescription>{project.description}</ItemDescription>
          </ItemContent>
          <ItemActions>
            <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
              {project.progress}
            </span>
          </ItemActions>
        </Item>
      ))}
    </ItemGroup>
  )
}

const slides = ["#f4511e", "#0ea5e9", "#22c55e", "#a855f7", "#f59e0b"]

export function CarouselDemo() {
  return (
    <Carousel className="w-full max-w-sm">
      <CarouselContent>
        {slides.map((color, i) => (
          <CarouselItem key={color} className="basis-1/2">
            <div
              className="flex h-28 items-center justify-center rounded-xl text-sm font-medium text-white"
              style={{ backgroundColor: color }}
            >
              Slide {i + 1}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

export function ChatDemo() {
  return (
    <MessageGroup className="w-full max-w-sm">
      <Message align="start">
        <MessageAvatar className="size-8 text-xs font-medium">GH</MessageAvatar>
        <MessageContent>
          <Bubble variant="default" align="start">
            <BubbleContent>
              <p className="text-sm">Deploy finished — can you check the preview?</p>
            </BubbleContent>
            <BubbleReactions>
              <ThumbsUp className="size-3.5" />
              2
            </BubbleReactions>
          </Bubble>
          <MessageFooter>Grace · 09:41</MessageFooter>
        </MessageContent>
      </Message>
      <Message align="end">
        <MessageAvatar className="size-8 text-xs font-medium">AL</MessageAvatar>
        <MessageContent>
          <Bubble variant="tinted" align="end">
            <BubbleContent>
              <p className="text-sm">On it 🚀</p>
            </BubbleContent>
          </Bubble>
          <MessageFooter>Read · 09:42</MessageFooter>
        </MessageContent>
      </Message>
    </MessageGroup>
  )
}
