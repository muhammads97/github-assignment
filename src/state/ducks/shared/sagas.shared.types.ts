import { IEndpoint, IRequestData, IResponse } from "@github/services"

export type TaskId = number

export interface IAction<P, M = {} | undefined, T = string, E = Error> {
  type: T
  payload: P
  meta: M
  error?: E
}

export type CancellableMeta = { taskId: TaskId }
export type CallbackMeta = { callback: (response: { ok: boolean }) => void }

export type ActionMeta = Partial<CancellableMeta & CallbackMeta>

interface IActionWithMeta<P, M> extends IAction<P, M> {
  meta: M
}

export type ICancellableAction<P> = IActionWithMeta<P, CancellableMeta>
export type ICallbackAction<P> = IActionWithMeta<P, CallbackMeta>

export type PreRequest<P, M, T, TServerData, TServerResponse, TPathParams, TData, TResponse> = (
  action: IAction<P, M, T>,
) => Generator<unknown, IRequestData<TServerData, TServerResponse, TPathParams, TData, TResponse>>
export type PostRequest<R, P, M, T> = (
  response: IResponse<R>,
  action: IAction<P, M, T>,
) => Generator<unknown, IResponse<R>>

export type ApiGeneratorParams<
  P,
  M,
  T,
  TServerData,
  TServerResponse,
  TPathParams,
  TData,
  TResponse,
> = {
  endpoint: IEndpoint<TServerData, TServerResponse, TPathParams, TData, TResponse>
  prepare?: PreRequest<P, M, T, TServerData, TServerResponse, TPathParams, TData, TResponse>
  post?: PostRequest<TResponse, P, M, T>
  cancellable?: boolean
}
