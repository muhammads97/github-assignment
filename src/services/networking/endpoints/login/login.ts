// TODO: Just an example. The endpoint folder should be removed

import { HttpMethod, IDataEndpoint } from "@github/services/networking/endpoints/endpoint.types"
import { SnakeKeysToCamelCase } from "@github/utils"
import { ILoginServerPayload, IServerLoginParams, IServerUser } from "./login.server"

export type IUser = SnakeKeysToCamelCase<IServerUser>
export type ILoginPayload = SnakeKeysToCamelCase<ILoginServerPayload>

export const loginEndpoint: IDataEndpoint<IServerLoginParams, ILoginServerPayload> = {
  path: "auth/login",
  method: HttpMethod.Post,
} as const
