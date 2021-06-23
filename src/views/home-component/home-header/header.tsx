import React from "react"
import { Image, Text, TouchableOpacity, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import image from "@github/assets/images"
import { AppRoute } from "@github/navigation/routes"
import layout from "@github/res/layout"
import { IHomeHeaderProps } from "./header.props"
import styles from "./header.styles"

export default (props: IHomeHeaderProps) => {
  const insets = useSafeAreaInsets()
  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          height: layout.headerHeight + insets.top,
        },
      ]}>
      <Text style={styles.title}>{AppRoute.Home}</Text>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => props.navigation.navigate(AppRoute.Search, {})}>
        <Image source={image.search} />
      </TouchableOpacity>
    </View>
  )
}
