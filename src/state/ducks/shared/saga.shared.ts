import { call, takeEvery } from "@redux-saga/core/effects"
import { createAction } from "@reduxjs/toolkit"
import { ExtractActionType } from "@github/utils"
import { TaskId } from "./sagas.shared.types"
import { SagaManager } from "."

export const cancelTaskAction = createAction("shared/cancel-task", (taskId: TaskId) => ({
  payload: { taskId },
}))

export const cancelTasksAction = createAction("shared/cancel-task", (taskIds: TaskId[]) => ({
  payload: { taskIds },
}))

function* cancelTask({ payload: { taskId } }: ExtractActionType<typeof cancelTaskAction>) {
  yield call([SagaManager, SagaManager.cancelTask], taskId)
}

function* cancelTasks({ payload: { taskIds } }: ExtractActionType<typeof cancelTasksAction>) {
  yield call([SagaManager, SagaManager.cancelTasks], taskIds)
}

export function* sharedSubscription() {
  yield takeEvery(cancelTaskAction.type, cancelTask)
  yield takeEvery(cancelTasksAction.type, cancelTasks)
}
