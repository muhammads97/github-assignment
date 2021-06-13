import { ImageSourcePropType, StatusBarStyle } from "react-native"
import { ChildrenProp } from "@github/utils"

export type ScreenPreset =
  /**
   * No scrolling. Suitable for full-screen carousels and components
   * which have built-in scrolling like FlatList.
   */
  | "fixed"

  /**
   * Like `fixed`, but the children are stretched to full width.
   */
  | "fixedStack"

  /**
   * Like `fixedStack`, but the content is centered on the screen.
   */
  | "fixedCenter"

  /**
   * Scrolls. Suitable for forms or other things requiring a keyboard.
   */
  | "scroll"

  /**
   * Like `scroll`, but children are stretched to full width.
   */
  | "scrollStack"

type FixedScreenPreset = Exclude<ScreenPreset, "scroll" | "scrollStack">
type ScrollScreenPreset = Exclude<ScreenPreset, FixedScreenPreset>

interface IBaseScreenProps {
  children?: ChildrenProp
  statusBarPreset?: StatusBarStyle
}

export interface IFixedScreenProps extends IBaseScreenProps {
  preset?: FixedScreenPreset
}

export interface IScrollScreenProps extends IBaseScreenProps {
  preset?: ScrollScreenPreset
}

export type IScreenProps = (IFixedScreenProps | IScrollScreenProps) & {
  backgroundSource?: ImageSourcePropType
}
