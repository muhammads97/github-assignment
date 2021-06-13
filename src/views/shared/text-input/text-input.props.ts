import { Ref } from "react"
import { ReturnKeyType, TextInputProps } from "react-native"

type TextInputType = "default"
type TextInputReturnType = Exclude<ReturnKeyType, "go">

type BaseInputProps = Omit<
  TextInputProps,
  | "value"
  | "onSubmitEditing"
  | "onChangeText"
  | "onChange"
  | "returnKeyType"
  | "underlineColorAndroid"
>
export interface IInputProps extends BaseInputProps {
  type?: TextInputType
  returnKeyType?: TextInputReturnType
  textColor?: string
  onChange?(text: string): void
  onSubmit?(): void
}

export interface ITextInputRef {
  text(): string
  focus(): void
}

export type TextInputRef = Ref<ITextInputRef>
