"use client"

import { staticClient } from "fumadocs-core/search/client/orama-static"
import { useDocsSearch } from "fumadocs-core/search/client"
import {
  SearchDialog,
  SearchDialogClose,
  SearchDialogContent,
  SearchDialogFooter,
  SearchDialogHeader,
  SearchDialogIcon,
  SearchDialogInput,
  SearchDialogList,
  SearchDialogOverlay,
} from "fumadocs-ui/components/dialog/search"
import { useSearchContext } from "fumadocs-ui/contexts/search"

/**
 * Static-export friendly search dialog: loads the prebuilt ZBSearch
 * index from /api/search and queries it entirely in the browser.
 */
export function SearchDialogStatic(props: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const { search, setSearch, query } = useDocsSearch({ client: staticClient() })
  const context = useSearchContext()

  if (!context.enabled) return null

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
          <SearchDialogInput />
          <SearchDialogClose />
        </SearchDialogHeader>
        <SearchDialogList items={query.data !== "empty" ? query.data : undefined} />
      </SearchDialogContent>
      <SearchDialogFooter />
    </SearchDialog>
  )
}
