import React, { useCallback } from "react"
import { ExtractProps } from "@github/utils/styles"
import { Container, getRippleConfig, StyledButton, styles } from "./button.styles"
import { ButtonStyle } from "./button.props"

const Button = ({
  style,
  ...restProps
}: ExtractProps<typeof StyledButton> & { style?: ButtonStyle }) => {
  const { preset = "default", ripplePreset = "primary" } = restProps

  const buttonStyle = useCallback(
    ({ pressed }: { pressed: boolean }) => (pressed ? [styles.pressedState, style] : style),
    [style],
  )
  return (
    <Container>
      <StyledButton
        android_ripple={getRippleConfig(preset, ripplePreset)}
        style={buttonStyle}
        {...restProps}
      />
    </Container>
  )
}

export default Button
