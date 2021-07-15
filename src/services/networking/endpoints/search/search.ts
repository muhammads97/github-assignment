import { HttpMethod, IDataEndpoint } from "@github/services/networking/endpoints/endpoint.types"
import { SnakeKeysToCamelCase } from "@github/utils"
import { ISearchResultParam, IServerSearchParams, IServerSearchPayload } from "./search.server"

export type ISearchResultItem = SnakeKeysToCamelCase<ISearchResultParam>
export type ISearchPayload = SnakeKeysToCamelCase<IServerSearchPayload>

export const searchEndpoint: IDataEndpoint<IServerSearchParams, IServerSearchPayload> = {
  path: "search/users",
  method: HttpMethod.Post,
} as const
