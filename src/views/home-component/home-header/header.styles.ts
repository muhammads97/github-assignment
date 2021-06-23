import { StyleSheet } from "react-native"
import color from "@github/res/color"
import layout from "@github/res/layout"

export default StyleSheet.create({
  container: {
    width: "100%",
    height: layout.headerHeight,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: color.statusBar,
    padding: 10,
    paddingStart: 20,
    paddingEnd: 20,
  },
  title: {
    fontSize: 20,
    color: color.text,
    fontWeight: "bold",
  },
})
