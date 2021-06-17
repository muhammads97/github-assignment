import { Dispatch, useCallback, useEffect, useRef } from "react"
import { cancellable, cancelTaskAction, cancelTasksAction, TaskId } from "@github/state"

function useCancelledDispatch<T extends unknown>(
  dispatch: Dispatch<T>,
): [Dispatch<T>, (taskId: TaskId) => void] {
  const taskIdsRef = useRef<TaskId[]>([])

  const cancelDispatch = useCallback(
    (action) => {
      const cancelledAction = cancellable(action)
      const { taskId } = cancelledAction.meta
      taskIdsRef.current.push(taskId)
      return dispatch(cancelledAction as T)
    },
    [dispatch],
  )

  const cancelTask = useCallback(
    (taskId: TaskId) => {
      dispatch(cancelTaskAction(taskId) as T)
    },
    [dispatch],
  )

  useEffect(
    () => () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      const taskIds = taskIdsRef.current
      dispatch(cancelTasksAction(taskIds) as T)
    },
    [dispatch],
  )

  return [cancelDispatch, cancelTask]
}

export default useCancelledDispatch
