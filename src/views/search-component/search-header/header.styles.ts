import { StyleSheet } from "react-native"
import color from "@github/res/color"
import layout from "@github/res/layout"

export default StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "flex-start",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: color.statusBar,
  },
  header: {
    height: layout.headerHeight,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingStart: 20,
    paddingEnd: 50,
    padding: 7,
    width: "100%",
  },
  input: {
    height: "100%",
    flexDirection: "row",
    flexGrow: 1,
    borderBottomWidth: 1,
    borderBottomColor: color.textInputPlaceholder + "50",
    marginStart: 15,
    marginEnd: -20,
    fontSize: 17,
    color: color.text,
  },
  searchOptions: {
    width: "100%",
    position: "absolute",
    backgroundColor: color.statusBar,
  },
})
