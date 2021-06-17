import { useCallback, useEffect, useRef, useState } from "react"
import { AsyncDispatch } from "./hooks.types"

function useLoadingDispatch(dispatch: AsyncDispatch): [boolean, AsyncDispatch] {
  const [loading, setLoading] = useState(false)
  const isUnmountedRef = useRef(false)

  useEffect(
    () => () => {
      isUnmountedRef.current = true
    },
    [],
  )

  const loadingDispatch = useCallback(
    (action, throwError: boolean = false) => {
      setLoading(true)
      return new Promise<void>((resolve, reject) =>
        dispatch(action, true)
          .then(resolve)
          .catch(() => {
            throwError && reject()
          })
          .finally(() => {
            if (isUnmountedRef.current) {
              return
            }

            setLoading(false)
          }),
      )
    },
    [dispatch],
  )
  return [loading, loadingDispatch]
}

export default useLoadingDispatch
