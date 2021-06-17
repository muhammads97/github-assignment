import { Task } from "redux-saga"
import { fork, put, join, cancel, cancelled, call } from "@redux-saga/core/effects"
import { showErrorAction } from "@github/state/ducks/error"
import {
  IResponse,
  IErrorResponse,
  ResponseProblem,
  IEndpoint,
  API,
  IRequestData,
} from "@github/services"
import { R } from "@github/res"
import {
  ActionMeta,
  ApiGeneratorParams,
  CallbackMeta,
  ICancellableAction,
  CancellableMeta,
  IAction,
  ICallbackAction,
  TaskId,
} from "./sagas.shared.types"

function* handleActionError(error: IErrorResponse) {
  if (error.problem === ResponseProblem.Cancelled) {
    return
  }

  yield put(showErrorAction({ message: error.serverMessage ?? error.message }))
}

export function apiRequest<TServerData, TServerResponse, TPathParams, TData, TResponse>(
  endpoint: IEndpoint<TServerData, TServerResponse, TPathParams, TData, TResponse>,
  requestData: IRequestData<TServerData, TServerResponse, TPathParams, TData, TResponse>,
) {
  return call(() => API.request(endpoint, requestData))
}

class SagaManager {
  private static latestTaskId = 0

  private static tasks = new Map<TaskId, Task>()

  public generator<T, AP, AT, AM, R>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handler: (action: IAction<AP, AM, AT>) => Generator<T, IResponse<R>, any>,
    onCancel?: () => void,
  ) {
    return function* (action: IAction<AP, AM>) {
      const { taskId = SagaManager.generateNewTaskId(), callback }: ActionMeta = action.meta ?? {}

      try {
        // @ts-ignore FIXME: Is there a way to infer this (see typescript 3.6 generators notes)?
        const task: Task = yield fork(handler, action)

        SagaManager.tasks.set(taskId, task)

        // @ts-ignore FIXME: Is there a way to infer this (see typescript 3.6 generators notes)?
        const response: IResponse<R> = yield join(task)

        if (!response.ok) {
          yield handleActionError(response)
        }

        callback && callback({ ok: response.ok })
      } catch (err) {
        yield handleActionError({
          ok: false,
          problem: ResponseProblem.Internal,
          message: R.string.errors.exceptionError,
          error: String(err),
        })
      } finally {
        const isCancelled: boolean = yield cancelled()
        if (isCancelled) {
          onCancel && onCancel()
        }

        SagaManager.removeTask(taskId)
      }
    }
  }

  public apiGenerator<P, M, T, TServerData, TServerResponse, TPathParams, TData, TResponse>({
    endpoint,
    prepare = function* (action) {
      const requestData = action.payload as unknown as IRequestData<
        TServerData,
        TServerResponse,
        TPathParams,
        TData,
        TResponse
      > as IRequestData<TServerData, TServerResponse, TPathParams, TData, TResponse>

      return requestData
    },
    post,
    cancellable = false,
  }: ApiGeneratorParams<P, M, T, TServerData, TServerResponse, TPathParams, TData, TResponse>) {
    const cancelSource = cancellable ? API.newCancelSource() : null

    return this.generator(function* (action: Parameters<typeof prepare>[0]) {
      const requestData: IRequestData<TServerData, TServerResponse, TPathParams, TData, TResponse> =
        yield prepare(action)

      let response: IResponse<TResponse> = yield apiRequest(endpoint, {
        ...requestData,
        cancelToken: cancelSource?.token,
      })

      if (post) {
        response = yield post(response, action)
      }

      return response
    }, cancelSource?.cancel)
  }

  public *cancelTask(taskId: TaskId) {
    yield this.cancelTasks([taskId])
  }

  public *cancelTasks(tasksId: TaskId[]) {
    const tasks = tasksId.reduce<Task[]>((foundTasks, id) => {
      const task = SagaManager.tasks.get(id)
      if (task) {
        foundTasks.push(task)
      }

      return foundTasks
    }, [])

    if (tasks.length > 0) {
      yield cancel(tasks)
      tasksId.forEach((id) => {
        SagaManager.tasks.delete(id)
      })
    }
  }

  public *cancelRunningTasks() {
    const tasks = Array.from(SagaManager.tasks.values())
    if (tasks.length > 0) {
      yield cancel(tasks)
      SagaManager.tasks.clear()
    }
  }

  public static generateNewTaskId() {
    SagaManager.latestTaskId += 1
    return SagaManager.latestTaskId
  }

  private static removeTask(taskId: TaskId) {
    SagaManager.tasks.delete(taskId)
  }
}

export default new SagaManager()

export const cancellable = <P>(action: IAction<P>): ICancellableAction<P> => {
  const taskMeta: CancellableMeta = { taskId: SagaManager.generateNewTaskId() }

  const meta = action.meta ?? {}

  return {
    ...action,
    meta: {
      ...meta,
      ...taskMeta,
    },
  }
}

export const withCallback = <P>(
  action: IAction<P>,
  onSuccess = () => {},
  onError = () => {},
): ICallbackAction<P> => {
  const callbackMeta: CallbackMeta = {
    callback: (response) => {
      if (response.ok) {
        onSuccess()
      } else {
        onError()
      }
    },
  }

  const meta = action.meta ?? {}

  return {
    ...action,
    meta: {
      ...meta,
      ...callbackMeta,
    },
  }
}
