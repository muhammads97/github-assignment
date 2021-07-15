export interface ISearchResult {
  name: string
}

export interface ISearchState {
  type: "Organizations" | "People" | undefined
  results: Array<ISearchResult>
}

export interface ISearch {
  results: Array<ISearchResult>
}
