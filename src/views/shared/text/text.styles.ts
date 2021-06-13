import styled, { css } from "styled-components/native"
import { R } from "@github/res"
import { ITextProps } from "./text.props"

const primary = css`
  font-family: ${R.font.primary};
  color: ${R.color.text};
`

const primaryLarger = css`
  ${primary};
  font-size: ${R.fontSize.larger}px;
`

const secondary = css`
  font-family: ${R.font.secondary};
`

const secondaryLarger = css`
  ${secondary};
  font-size: ${R.fontSize.larger}px;
`

const secondaryBig = css`
  ${secondary};
  font-size: ${R.fontSize.big}px;
`

const tertiary = css`
  font-family: ${R.font.tertiary};
`

const tertiaryLarge = css`
  ${tertiary}
  font-size: ${R.fontSize.large}px;
`

const tertiaryLarger = css`
  ${tertiary}
  font-size: ${R.fontSize.larger}px;
`

const bold = css`
  font-weight: bold;
`

export const StyledText = styled.Text<ITextProps>`
  ${({ preset = "primary", bolded }) => css`
    ${preset === "primary" && primary}
    ${preset === "primaryLarger" && primaryLarger}
    ${preset === "secondary" && secondary}
    ${preset === "secondaryLarger" && secondaryLarger}
    ${preset === "secondaryBig" && secondaryBig}
    ${preset === "tertiary" && tertiary}
    ${preset === "tertiaryLarge" && tertiaryLarge}
    ${preset === "tertiaryLarger" && tertiaryLarger}
    ${bolded && bold}
  `}
`
