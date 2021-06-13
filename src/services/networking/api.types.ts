import type { CancelToken, CancelTokenSource } from "axios"
import { ApiResponse } from "apisauce"
import { SnakeKeysToCamelCase } from "@github/utils"
import { IEndpoint, UndefinedDataType, UndefinedPathParamsType } from "./endpoints"

export interface IServerPayload<T> {
  data: T
}

export type IPayload<T> = SnakeKeysToCamelCase<IServerPayload<T>>

export interface IApiErrorResponse {
  message: string
}

export type IApiResponse<TOkResponse> = ApiResponse<TOkResponse, IApiErrorResponse>

export enum ResponseProblem {
  Timeout = "timeout", // Times up.
  CannotConnect = "cannot-connect", // Cannot connect to the server for some reason.
  Server = "server", // The server experienced a problem. Any 5xx error.
  Unauthorized = "unauthorized", // We're not allowed because we haven't identified ourself. This is 401.
  Forbidden = "forbidden", // We don't have access to perform that request. This is 403.
  NotFound = "not-found", // Unable to find that resource.  This is a 404.
  Rejected = "rejected", // All other 4xx series errors.
  Unknown = "unknown", // Something truly unexpected happened. Most likely can try again. This is a catch all.
  BadData = "bad-data", // The data we received is not in the expected format.
  Cancelled = "cancelled", // Request is cancelled
  Internal = "internal", // For app exceptions
}

interface IApiProblem {
  problem: Exclude<ResponseProblem, ResponseProblem.Cancelled>
  message: string
  temporary?: boolean
}

export type IGeneralProblem = IApiProblem | { problem: ResponseProblem.Cancelled }

export interface IOkResponse<T> {
  ok: true
  data: T
}

export type IErrorResponse = IGeneralProblem & {
  ok: false
  code?: number
  serverMessage?: string
  error: string
}

export type IResponse<T> = IOkResponse<T> | IErrorResponse

export type TokenType = string | null

export type { CancelToken, CancelTokenSource }

export type IRequestData<TServerData, TServerResponse, TPathParams, TData, TResponse> = Omit<
  IEndpoint<TServerData, TServerResponse, TPathParams, TData, TResponse>,
  "path" | "method" | "data"
> & {
  cancelToken?: CancelToken
} & (TData extends UndefinedDataType ? {} : TData) &
  (TPathParams extends UndefinedPathParamsType ? {} : { pathParams: TPathParams })
