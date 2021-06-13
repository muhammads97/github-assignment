import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IError, IErrorState } from "./error.types"

const initialState: IErrorState = {}

const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    showError(state, action: PayloadAction<IError>) {
      state.error = action.payload
    },
    hideError(state) {
      state.error = undefined
    },
  },
})

export const { showError: showErrorAction, hideError: hideErrorAction } = errorSlice.actions
export const errorReducerName = errorSlice.name
export default errorSlice.reducer
