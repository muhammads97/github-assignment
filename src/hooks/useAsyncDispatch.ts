import { Dispatch, useCallback } from "react"
import { withCallback } from "@github/state"
import { AsyncDispatch } from "./hooks.types"

function useAsyncDispatch<T extends unknown>(dispatch: Dispatch<T>): AsyncDispatch {
  const asyncDispatch = useCallback(
    async (action, throwError: boolean = false) => {
      return new Promise<void>((resolve, reject) => {
        dispatch(withCallback(action, resolve, throwError ? reject : undefined) as T)
      })
    },
    [dispatch],
  )

  return asyncDispatch
}

export default useAsyncDispatch
