/* eslint-disable react-native/no-inline-styles */
import React from "react"
import { Image, TextInput, TouchableOpacity, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useDispatch } from "react-redux"
import image from "@github/assets/images"
import { AppRoute } from "@github/navigation/routes"
import color from "@github/res/color"
import layout from "@github/res/layout"
import { searchUsersAction } from "@github/state"
import { ISearchHeaderProps } from "./header.props"
import styles from "./header.styles"
import SearchOption from "./search-option"

export default (props: ISearchHeaderProps) => {
  const dispatch = useDispatch()
  const [searchWord, setSearchWord] = React.useState("")
  const [searchFocused, setSearchFocused] = React.useState(false)
  const insets = useSafeAreaInsets()
  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
        },
      ]}>
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => props.navigation.navigate(AppRoute.Home, {})}>
          <Image source={image.back} style={{ height: 27 }} />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder={"Search GitHub"}
          placeholderTextColor={color.textInputPlaceholder}
          autoCorrect={false}
          onChangeText={(text) => setSearchWord(text)}
          value={searchWord}
          focusable={true}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
        />
        {searchWord.length > 0 && (
          <TouchableOpacity activeOpacity={0.7} onPress={() => setSearchWord("")}>
            <Image source={image.cancel} style={{ height: 20 }} />
          </TouchableOpacity>
        )}
      </View>
      {searchFocused && searchWord.length > 0 ? (
        <View style={[styles.searchOptions, { start: 0, top: layout.headerHeight + insets.top }]}>
          <SearchOption
            icon={image.organization}
            name={"Organizations"}
            text={searchWord}
            onPress={(name) => console.log(name)}
          />
          <SearchOption
            icon={image.people}
            name={"People"}
            text={searchWord}
            onPress={(name) => {
              dispatch(searchUsersAction(name))
              setSearchFocused(false)
            }}
          />
        </View>
      ) : null}
    </View>
  )
}
