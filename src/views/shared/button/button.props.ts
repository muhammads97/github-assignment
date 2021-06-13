import { StyleProp, ViewStyle } from "react-native"

export type ButtonPreset = "default" | "circular" | "circular-small"
export type RipplePreset = "primary" | "secondary"

export interface IButtonProps {
  preset?: ButtonPreset
  ripplePreset?: RipplePreset
}

export type ButtonStyle = StyleProp<ViewStyle>
