import React, { forwardRef, useCallback, useImperativeHandle, useRef, useState } from "react"
import { TextInput } from "react-native"
import { R } from "@github/res"
import { IInputProps, TextInputRef } from "./text-input.props"
import { StyledInput } from "./text-input.styles"

const Input = (
  {
    type = "default",
    defaultValue = "",
    multiline = false,
    placeholderTextColor = R.color.textInputPlaceholder,
    returnKeyType = "done",
    textAlign = "left",
    autoCapitalize = "none",
    clearTextOnFocus = false,
    clearButtonMode = "never",
    keyboardType = "default",
    textContentType = "none",
    textColor = R.color.text,
    textAlignVertical = "center",
    secureTextEntry = false,
    selectionColor = R.color.textInputSelection,
    onChange,
    onSubmit,
    ...restProps
  }: IInputProps,
  ref: TextInputRef,
) => {
  const inputRef = useRef<TextInput>(null)
  const textRef = useRef("")
  const [text, changeText] = useState(defaultValue)

  useImperativeHandle(
    ref,
    () => ({
      text: () => textRef.current,
      focus: () => {
        inputRef.current?.focus()
      },
    }),
    [],
  )

  const onTextChange = useCallback(
    (newText: string) => {
      textRef.current = newText
      changeText(newText)
      onChange && onChange(newText)
    },
    [onChange],
  )

  return (
    <StyledInput
      ref={inputRef}
      value={text}
      multiline={multiline}
      placeholderTextColor={placeholderTextColor}
      returnKeyType={returnKeyType}
      textAlign={textAlign}
      autoCapitalize={autoCapitalize}
      clearTextOnFocus={clearTextOnFocus}
      clearButtonMode={clearButtonMode}
      keyboardType={keyboardType}
      textContentType={textContentType}
      textColor={textColor}
      secureTextEntry={secureTextEntry}
      textAlignVertical={textAlignVertical}
      underlineColorAndroid={R.color.transparent}
      selectionColor={selectionColor}
      onChangeText={onTextChange}
      onSubmitEditing={onSubmit}
      {...restProps}
    />
  )
}

export default forwardRef(Input)
