import React from "react"
import { ExtractProps } from "@github/utils"
import { StyledText } from "./text.styles"

const Text = ({ lines, ...restProps }: ExtractProps<typeof StyledText>) => {
  const numberOfLines = lines === "single" ? 1 : 0

  return <StyledText numberOfLines={numberOfLines} {...restProps} />
}

export default Text
