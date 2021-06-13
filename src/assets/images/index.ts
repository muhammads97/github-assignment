import { ImageRequireSource } from "react-native"

const image = Object.freeze({
  back: require("./back.png"),
  home: require("./home.png"),
  search: require("./search.png"),
  organization: require("./organization.png"),
  people: require("./people.png"),
  cancel: require("./cancel.png"),
})

export default image as Record<keyof typeof image, ImageRequireSource>
