import { IAppState } from "@github/state/types"
import { IError } from "./error.types"

export const getError = ({ error }: IAppState): Partial<IError> => error.error ?? {}
export const getErrorMessage = (state: IAppState): string | undefined => getError(state).message
