import { ChildrenProp } from "@github/utils"

export interface ISafeAreaViewProps {
  top?: boolean
  bottom?: boolean
  left?: boolean
  right?: boolean
  horizontal?: boolean
  vertical?: boolean
  children?: ChildrenProp
}
