"use client"

import {
  MarkdownCopyButton,
  ViewOptionsPopover,
} from "fumadocs-ui/layouts/glass/page"


type PageActionsProps = {
  markdownUrl: string
  githubUrl: string
}

export function PageActions({ markdownUrl, githubUrl }: PageActionsProps) {
  return (
    <div className="flex gap-1 items-center">
      <MarkdownCopyButton
        markdownUrl={markdownUrl}
      ><span className="desktop">Copy Page</span></MarkdownCopyButton>
      <ViewOptionsPopover
        markdownUrl={markdownUrl}
        githubUrl={githubUrl}
      > <span className="desktop">Open</span></ViewOptionsPopover>
    </div>
  )
}