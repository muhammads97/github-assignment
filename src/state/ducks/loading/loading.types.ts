export enum LoadingType {
  General = "general",
}

export interface ILoadingPayload {
  type: LoadingType
  loading: boolean
}

export type ILoadingState = Record<LoadingType, boolean>
