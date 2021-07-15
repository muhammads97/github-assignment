import { IAppState } from "@github/state/types"
import { ISearchResult } from "./search.types"

export const getResults = ({ search }: IAppState): Partial<Array<ISearchResult>> => search.results
