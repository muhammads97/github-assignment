import React from "react"
import { StatusBar as RNStatusBar } from "react-native"
import { R } from "@github/res"
import { IStatusBarProps } from "./status-bar.props"

export const StatusBar = ({ preset, contentPreset }: IStatusBarProps) => {
  const translucent = preset === "transparent"
  const color = preset === "transparent" ? R.color.transparent : R.color.statusBar

  return <RNStatusBar barStyle={contentPreset} translucent={translucent} backgroundColor={color} />
}
