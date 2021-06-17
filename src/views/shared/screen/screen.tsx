import React from "react"
import { BackgroundImage } from "@github-shared/image"
import { StatusBar } from "@github-shared"
import { Container } from "@github-shared/layout"
import { IScreenProps } from "./screen.props"
import { StyledFixedScreen, StyledScrollScreen, styles } from "./screen.styles"

const Screen = (props: IScreenProps) => {
  const { preset = "fixed", statusBarPreset = "dark-content", backgroundSource, ...rest } = props

  return (
    <Container>
      <StatusBar contentPreset={statusBarPreset} preset="transparent" />
      {backgroundSource && <BackgroundImage source={backgroundSource} />}
      {preset === "scroll" || preset === "scrollStack" ? (
        <StyledScrollScreen
          preset={preset}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={preset === "scrollStack" && styles.stackContent}
          {...rest}
        />
      ) : (
        <StyledFixedScreen preset={preset} {...rest} />
      )}
    </Container>
  )
}

export default Screen
