import { ComponentType } from "react"
import { StyleProp, StyleSheet, ViewStyle, TextStyle, ImageStyle } from "react-native"

type Style<T> = StyleProp<T> | Array<StyleProp<T>>

// Useful to extract props from styled components
export type ExtractProps<TComponentOrTProps> = TComponentOrTProps extends ComponentType<
  infer TProps
>
  ? TProps
  : TComponentOrTProps

// Trick to convert view style object `obj` type form {[key in string]: ViewStyle} to
// {[key in keysof typeof obj]: ViewStyle }
export function ViewStyleSheet<V extends string>(obj: Record<V, ViewStyle>): typeof obj {
  return obj
}

// Trick to convert text style object `obj` type form {[key in string]: TextStyle} to
// {[key in keysof typeof obj]: TextStyle }
export function TextStyleSheet<V extends string>(obj: Record<V, TextStyle>): typeof obj {
  return obj
}

// Trick to convert image style object `obj` type form {[key in string]: ImageStyle} to
// {[key in keysof typeof obj]: ImageStyle }
export function ImageStyleSheet<V extends string>(obj: Record<V, ImageStyle>): typeof obj {
  return obj
}

export const composeStyles = <T1, T2>(style1: Style<T1>, style2: Style<T2>): Style<T1> =>
  // @ts-ignore TODO: Recheck if there's a proper way
  StyleSheet.compose(style1, style2)
