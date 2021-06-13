import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { LoadingType, ILoadingState, ILoadingPayload } from "./loading.types"

const initialState: ILoadingState = {
  [LoadingType.General]: false,
}

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoading: {
      prepare: (type: LoadingType, loading: boolean) => ({ payload: { type, loading } }),
      reducer: (state, { payload: { type, loading } }: PayloadAction<ILoadingPayload>) => {
        state[type] = loading
      },
    },
  },
})

export const { setLoading } = loadingSlice.actions
export const loadingReducerName = loadingSlice.name
export default loadingSlice.reducer
