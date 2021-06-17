import { ApisauceInstance, CancelToken, create, Monitor } from "apisauce"
import axiosRetry from "axios-retry"
import { R } from "@github/res"
import { IApiConfig, DEFAULT_API_CONFIG } from "./api.config"
import { getGeneralApiProblem } from "./api.problem"
import {
  TokenType,
  IResponse,
  ResponseProblem,
  IApiResponse,
  CancelTokenSource,
  IRequestData,
} from "./api.types"
import { HttpMethod, IEndpoint, IMapper } from "./endpoints"
import { defaultDataMapper, defaultMapper, parse } from "./api.utils"

export class Api {
  /**
   * The underlying apisauce instance which performs the requests.
   */
  private apisauce!: ApisauceInstance

  /**
   * Configurable options.
   */
  private config: IApiConfig

  /**
   * Current user session token.
   */
  private _token!: TokenType

  private allRequestsCancelSource: CancelTokenSource

  public constructor(config: IApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
    this.allRequestsCancelSource = CancelToken.source()
    this.setup()
  }

  /**
   * Call the endpoint and returns the response data if call is made successfully or error object otherwise.
   *
   * @param endpoint endpoint to request
   * @param requestData body data, path parameters, response type, mapper to map response etc
   *
   * @return response of type `IResponse<TResponse>`
   */
  public async request<TServerData, TServerResponse, TPathParams, TData, TResponse>(
    { method, path }: IEndpoint<TServerData, TServerResponse, TPathParams, TData, TResponse>,
    {
      pathParams,
      cancelToken = this.allRequestsCancelSource.token,
      mapper = defaultMapper,
      dataMapper = defaultDataMapper,
      responseType = "json",
      ...data
    }: IRequestData<TServerData, TServerResponse, TPathParams, TData, TResponse>,
  ): Promise<IResponse<TResponse>> {
    const fullPath = pathParams ? parse(path, ...pathParams) : path
    const serverData = data && dataMapper(data as TData)

    const operation = this.getMethodOperation(method)
    const response: IApiResponse<TServerResponse> = await operation(fullPath, serverData, {
      cancelToken,
      responseType,
    })

    return this.handleApiResponse(response, mapper)
  }

  private getMethodOperation(method: HttpMethod) {
    switch (method) {
      case HttpMethod.Get:
        return this.apisauce.get
      case HttpMethod.Post:
        return this.apisauce.post
      case HttpMethod.Put:
        return this.apisauce.put
      case HttpMethod.Delete:
        return this.apisauce.delete
    }
  }

  public get token() {
    return this._token
  }

  public setToken(token: TokenType) {
    this._token = token
  }

  public reset() {
    this._token = null
    this.allRequestsCancelSource.cancel()
    this.allRequestsCancelSource = CancelToken.source()
  }

  public addMonitor(monitor: Monitor) {
    this.apisauce?.addMonitor(monitor)
  }

  public newCancelSource() {
    return CancelToken.source()
  }

  private setup() {
    this._token = null
    this.apisauce = create({
      baseURL: this.config.url,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })

    // Exponential Back-off Retry Mechanism
    // https://developers.google.com/analytics/devguides/reporting/core/v3/errors#backoff
    axiosRetry(this.apisauce.axiosInstance, {
      retries: 4,
      retryDelay: (retryNumber) => {
        const delay = Math.pow(2, retryNumber) * this.config.minimumTimeout
        const randomSum = delay * 0.2 * Math.random()
        return delay + randomSum
      },
    })
  }

  private handleApiResponse<TServerResponse, TResponse>(
    response: IApiResponse<TServerResponse>,
    mapper: IMapper<TServerResponse, TResponse>,
  ): IResponse<TResponse> {
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)

      return {
        ok: false,
        ...problem,
        code: response.status,
        serverMessage: response.data?.message,
        error: response.originalError.message,
      }
    }

    const body = response.data

    try {
      const data = body ? mapper(body) : ({} as unknown as TResponse)
      return { ok: true, data }
    } catch (error) {
      return {
        ok: false,
        problem: ResponseProblem.BadData,
        temporary: true,
        message: R.string.errors.badDataError,
        error: error?.message ?? String(error),
      }
    }
  }
}

export default new Api()
