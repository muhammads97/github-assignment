import React from "react"
import { R } from "@github/res"
import { IRefreshControlProps } from "./refresh-control.props"
import { StyledRefreshControl } from "./refresh-control.styles"

const RefreshControl = ({
  color = R.color.refreshControl,
  backgroundColor = R.color.refreshControlBackground,
  ...restProps
}: IRefreshControlProps) => (
  <StyledRefreshControl
    progressBackgroundColor={backgroundColor}
    colors={[color]}
    tintColor={color}
    {...restProps}
  />
)

export default RefreshControl
