import { IAppState } from "@github/state/types"

const getLoading = ({ loading }: IAppState) => loading
export const generalLoading = (state: IAppState) => getLoading(state).general
