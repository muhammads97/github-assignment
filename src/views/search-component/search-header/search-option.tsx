/* eslint-disable react-native/no-inline-styles */
import React from "react"
import { Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity } from "react-native"
import color from "@github/res/color"

interface IProps {
  icon: ImageSourcePropType
  name: string
  text: string
  onPress: (name: string) => void
}

export default ({ icon, name, text, onPress }: IProps) => {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.7} onPress={() => onPress(name)}>
      <Image source={icon} style={{ height: 27 }} />
      <Text style={styles.text} numberOfLines={1}>
        {name} with "{text}"
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 20,
    paddingBottom: 7,
    justifyContent: "flex-start",
    flexDirection: "row",
  },
  text: {
    color: color.text,
    marginStart: 15,
    fontSize: 17,
    justifyContent: "center",
    marginTop: 2,
    maxWidth: "80%",
  },
})
