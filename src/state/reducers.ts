import { errorReducer, errorReducerName, loadingReducer, loadingReducerName } from "./ducks/"

const reducers = {
  [errorReducerName]: errorReducer,
  [loadingReducerName]: loadingReducer,
} as const

export default reducers
