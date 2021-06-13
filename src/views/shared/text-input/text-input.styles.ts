import styled, { css } from "styled-components/native"
import { R } from "@github/res"
import { IInputProps } from "./text-input.props"

export const StyledInput = styled.TextInput<IInputProps>`
  flex: 1;
  font-size: ${R.fontSize.large}px;
  line-height: 20px;
  ${({ textColor = R.color.text }) => css`
    color: ${textColor};
  `}
`
