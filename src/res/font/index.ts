import fonts from "@github/assets/fonts"

// TODO: Should be changed after adding the app fonts
const font = {
  primary: fonts.system,
  secondary: fonts.system,
  tertiary: fonts.system,
} as const

export default font
export { default as fontSize } from "./font.size"
