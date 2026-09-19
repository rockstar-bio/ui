import { createLoader } from "nuqs/server"
import { searchParamKeys, searchParams } from "./parms-client"

export { buildFlagSearchParamHref, hasFlagSearchParam } from "./parms-client"
export { searchParamKeys, searchParams }

export const SearchParams = createLoader(searchParams, {
  urlKeys: searchParamKeys,
})
