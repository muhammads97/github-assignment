import React from "react"
import { Edge } from "react-native-safe-area-context"
import { composeStyles, ExtractProps, Platform } from "@github/utils"
import {
  StyledKeyboardAvoidingView as KeyboardAvoidingView,
  StyledScrollView as ScrollView,
  layoutStyles,
  StyledSafeAreaView,
} from "./layout.styles"
import { ISafeAreaViewProps } from "./layout.props"

export const ScrollContainer = (props: ExtractProps<typeof ScrollView>) => (
  <KeyboardAvoidingView behavior={Platform.isIOS ? "padding" : undefined}>
    <ScrollView
      contentContainerStyle={composeStyles(layoutStyles.scrollContent, props.contentContainerStyle)}
      {...props}
    />
  </KeyboardAvoidingView>
)

export const SafeAreaView = ({
  top: topProp,
  bottom: bottomProp,
  left: leftProp,
  right: rightProp,
  horizontal,
  vertical,
  children,
}: ISafeAreaViewProps) => {
  const top = topProp || vertical
  const bottom = bottomProp || vertical
  const left = leftProp || horizontal
  const right = rightProp || horizontal
  const all = top === undefined && bottom === undefined && left === undefined && right === undefined

  const edges: Edge[] = []
  if (top || all) {
    edges.push("top")
  }
  if (bottom || all) {
    edges.push("bottom")
  }
  if (left || all) {
    edges.push("left")
  }
  if (right || all) {
    edges.push("right")
  }

  return (
    <StyledSafeAreaView mode={children ? "padding" : "margin"} edges={edges}>
      {children}
    </StyledSafeAreaView>
  )
}
