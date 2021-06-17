import React from "react"
import { View } from "react-native"
import { Screen } from "@github-shared"
import color from "@github/res/color"

export default () => (
  <Screen preset="fixedStack">
    <View style={{ flex: 1, width: "100%", backgroundColor: color.background }} />
  </Screen>
)
