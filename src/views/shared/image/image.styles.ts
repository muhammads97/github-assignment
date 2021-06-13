import styled from "styled-components/native"

export const StyledImage = styled.Image``

export const StyledFitImage = styled.Image`
  width: 100%;
  height: 100%;
  resize-mode: center;
`

export const StyledBackgroundImage = styled(StyledImage)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  resize-mode: stretch;
`
