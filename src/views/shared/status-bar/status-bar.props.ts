import { StatusBarStyle } from "react-native"

type StatusBarPreset = "primary" | "transparent"

export interface IStatusBarProps {
  preset: StatusBarPreset
  contentPreset: StatusBarStyle
}
