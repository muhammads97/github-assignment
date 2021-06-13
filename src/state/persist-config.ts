import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2"
import { PersistConfig } from "redux-persist"
import { AsyncStorage } from "@github/services/storage"
import { IAppState } from "./types"
import { errorReducerName, loadingReducerName } from "./ducks"

const persistConfig: PersistConfig<IAppState> = {
  key: "root",
  version: 0,
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
  blacklist: [errorReducerName, loadingReducerName],
}

export default persistConfig
