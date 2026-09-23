"use client"

import { staticClient } from "fumadocs-core/search/client/orama-static"
import { useDocsSearch } from "fumadocs-core/search/client"
import { useRouter } from "fumadocs-core/framework"
import {
  SearchDialog,
  SearchDialogClose,
  SearchDialogContent,
  SearchDialogFooter,
  SearchDialogHeader,
  SearchDialogIcon,
  SearchDialogInput,
  SearchDialogList,
  SearchDialogListItem,
  SearchDialogOverlay,
} from "fumadocs-ui/components/dialog/search"
import { useSearchContext } from "fumadocs-ui/contexts/search"
import { BookOpen, Palette, Rocket, Sparkles, Wrench } from "lucide-react"

const featuredSearchItems = [
  { id: "introduction", label: "Introduction", icon: BookOpen, href: "/docs" },
  {
    id: "quick-start",
    label: "Quick Start",
    icon: Rocket,
    href: "/docs/getting-started/quick-start",
  },
  {
    id: "installation",
    label: "Installation",
    icon: Wrench,
    href: "/docs/getting-started/installation",
  },
  {
    id: "theming",
    label: "Theming",
    icon: Palette,
    href: "/docs/getting-started/theming",
  },
  {
    id: "components",
    label: "Components",
    icon: Sparkles,
    href: "/docs/components/button",
  },
]

/**
 * Static-export friendly search dialog: loads the prebuilt ZBSearch
 * index from /api/search and queries it entirely in the browser.
 */
export function SearchDialogStatic(props: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const { search, setSearch, query } = useDocsSearch({ client: staticClient() })
  const context = useSearchContext()
  const router = useRouter()

  if (!context.enabled) return null

  const items = search.trim()
    ? query.data !== "empty"
      ? query.data
      : []
    : featuredSearchItems.map(({ id, label, icon: Icon, href }) => ({
        id,
        type: "action" as const,
        node: (
          <span className="flex items-center gap-3 text-base">
            <Icon className="text-fd-muted-foreground size-5" />
            {label}
          </span>
        ),
        onSelect: () => router.push(href),
      }))

  return (
    <SearchDialog
      search={search}
      onSearchChange={setSearch}
      isLoading={query.isLoading}
      {...props}
    >
      <SearchDialogOverlay />
      <SearchDialogContent>
        <SearchDialogHeader>
          <SearchDialogIcon />
          <SearchDialogInput data-no-ring />
          <SearchDialogClose />
        </SearchDialogHeader>
        <SearchDialogList
          items={items}
          className="border-fd-border/70 border-t"
          Item={({ item, onClick }) => (
            <SearchDialogListItem
              item={item}
              onClick={onClick}
              className="px-3 py-3 text-base"
            />
          )}
        />
      </SearchDialogContent>
      <SearchDialogFooter />
    </SearchDialog>
  )
}
