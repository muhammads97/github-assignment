import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ISearch, ISearchState } from "./search.types"

const initialState: ISearchState = {
  type: undefined,
  results: [],
}

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    clearSearch(state) {
      state.results = []
      state.type = undefined
    },
    searchUsers(state, action: PayloadAction<ISearch>) {
      state.type = "People"
      state.results = action.payload.results
    },
    searchOrganizations(state, action: PayloadAction<ISearch>) {
      state.type = "Organizations"
      state.results = action.payload.results
    },
  },
})

export const {
  clearSearch: clearSearchAction,
  searchUsers: searchUsersAction,
  searchOrganizations: searchOrganizationsAction,
} = searchSlice.actions
export const searchReducerName = searchSlice.name
export default searchSlice.reducer
