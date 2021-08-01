import {
  errorReducer,
  errorReducerName,
  loadingReducer,
  loadingReducerName,
  searchReducer,
} from "./ducks"
import { searchReducerName } from "./ducks/search/search"

const reducers = {
  [errorReducerName]: errorReducer,
  [loadingReducerName]: loadingReducer,
  [searchReducerName]: searchReducer,
} as const

export default reducers
