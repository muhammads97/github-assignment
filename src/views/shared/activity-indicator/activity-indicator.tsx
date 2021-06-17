import React from "react"
import { R } from "@github/res"
import { ExtractProps } from "@github/utils"
import { StyledActivityIndicator } from "./activity-indicator.styles"

const ActivityIndicator = ({
  preset = "small",
  ...rest
}: ExtractProps<typeof StyledActivityIndicator>) => (
  <StyledActivityIndicator {...rest} color={R.color.activityIndicator} size={preset} />
)

export default ActivityIndicator
