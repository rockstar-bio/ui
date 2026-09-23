import { Separator, Skeleton, SkeletonAvatar, SkeletonButton, SkeletonText } from "rockin/ui"

export function SeparatorDemo() {
  return (
    <div className="w-full max-w-xs">
      <div className="space-y-1">
        <h4 className="text-sm font-medium leading-none">Rock Star UI</h4>
        <p className="text-sm text-muted-foreground">The build system for product teams.</p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center gap-4 text-sm">
        <div>Docs</div>
        <Separator orientation="vertical" />
        <div>Components</div>
        <Separator orientation="vertical" />
        <div>Changelog</div>
      </div>
    </div>
  )
}

export function SkeletonDemo() {
  return (
    <div className="flex w-full max-w-sm items-center gap-4">
      <Skeleton className="size-12 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  )
}

export function SkeletonCardDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3 rounded-xl border p-4">
      <div className="flex items-center gap-3">
        <SkeletonAvatar />
        <div className="flex-1 space-y-1.5">
          <Skeleton className="h-3.5 w-32" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
      <SkeletonText className="w-full" />
      <SkeletonText className="w-2/3" />
      <SkeletonButton className="mt-1 self-end" />
    </div>
  )
}
