import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { put, takeLatest } from "redux-saga/effects"
import { searchEndpoint } from "@github/services/networking/endpoints/search"
import { ExtractActionType } from "@github/utils"
import { SagaManager } from "@github/state/ducks/shared"
import { ISearch, ISearchState } from "./search.types"

const initialState: ISearchState = {
  type: undefined,
  results: [],
}

export const searchUsersAction = createAction("search/search-users", (searchKeyWords: string) => ({
  payload: {
    pathParams: [`q=${searchKeyWords}`],
  },
}))

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    clearSearch(state) {
      state.results = []
      state.type = undefined
    },
    setUsers(state, action: PayloadAction<ISearch>) {
      state.type = "People"
      state.results = action.payload.results
    },
    setOrganizations(state, action: PayloadAction<ISearch>) {
      state.type = "Organizations"
      state.results = action.payload.results
    },
  },
})

export function* searchUsers({
  payload: { searchKeyWords },
}: ExtractActionType<typeof searchUsersAction>) {
  const apiGenerator = SagaManager.apiGenerator({
    endpoint: searchEndpoint,
    cancellable: false,
  })
  const results = yield apiGenerator(searchUsersAction(searchKeyWords))
  yield put({ type: setUsersAction.type, payload: { results: results.items } })
}

export function* searchSubscription() {
  yield takeLatest(searchUsersAction.type, searchUsers)
}

export const {
  clearSearch: clearSearchAction,
  setUsers: setUsersAction,
  setOrganizations: setOrganizationsAction,
} = searchSlice.actions
export const searchReducerName = searchSlice.name
export default searchSlice.reducer
