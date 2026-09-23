"use client"

import type { ComponentProps } from "react"
import Image from "next/image"

import { GitHubIcon } from "@/components/icons"
import Link from "next/link"
import { buttonVariants } from "rockin/ui"

export function SidebarBrand({}: ComponentProps<"a">) {
  return (
    <div className="contents">
      <a href="/" aria-label="rockin home" className="min-w-0 flex-1">
        <Image
          src="/rockin.png"
          alt="rockin"
          width={36}
          height={36}
          priority
          className="size-8 object-contain"
        />
      </a>

      <Link
        href="https://github.com/rockstar-bio/ui"
        target="_blank"
        rel="noreferrer"
        aria-label="GitHub"
        className={buttonVariants({
          variant: "secondary",
          size: "icon-sm",
          className: "-mt-1.5 rounded-full! border-border!",
        })}
      >
        <GitHubIcon />
      </Link>
    </div>
  )
}
