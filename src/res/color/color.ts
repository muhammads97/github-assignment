import { Theme } from "@react-navigation/native"
import palette from "./palette"

export default class AppColor {
  // TODO: Just an example. Each screen should be have an instance with its custom colors
  public test = {}

  public activityIndicator = palette.white.base

  public ripple = palette.grey.base

  public secondaryRipple = palette.black.smoke

  public background = palette.black.base

  public text = palette.white.base

  public textInputPlaceholder = palette.grey.light

  public textInputSelection = palette.blue.base

  public divider = palette.grey.base

  public statusBar = palette.black.medium

  public refreshControlBackground = palette.blue.base

  public refreshControl = palette.white.base

  public transparent = palette.transparent

  public themeColors: Partial<Theme["colors"]> = {}
}
