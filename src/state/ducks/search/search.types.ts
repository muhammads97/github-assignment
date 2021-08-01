import { ISearchResultParam } from "@github/services/networking/endpoints/search/search.server"

export interface ISearchState {
  type: "Organizations" | "People" | undefined
  results: Array<ISearchResultParam>
}

export interface ISearch {
  results: Array<ISearchResultParam>
}
