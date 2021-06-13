import { ColorValue, RefreshControlProps } from "react-native"

type BaseRefreshControlProps = Pick<RefreshControlProps, "refreshing" | "onRefresh">

export interface IRefreshControlProps extends BaseRefreshControlProps {
  color?: ColorValue
  backgroundColor?: ColorValue
}
