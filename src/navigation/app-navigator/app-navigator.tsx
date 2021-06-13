import React, { useCallback } from "react"
import { DefaultTheme, NavigationContainer, NavigationContainerRef } from "@react-navigation/native"
import SplashScreen from "react-native-splash-screen"
import { RootNavigator } from "@github/navigation/root-navigator"
import NavigationService from "@github/navigation/navigation-service"
import { R } from "@github/res"
import { IAppParamList } from "./app-navigator.types"

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...R.color.themeColors,
  },
}

const AppNavigator = () => {
  const onReady = useCallback(() => {
    SplashScreen.hide()
  }, [])

  return (
    <NavigationContainer
      ref={(ref: NavigationContainerRef<IAppParamList>) => {
        NavigationService.setTopLevelNavigator(ref)
      }}
      onReady={onReady}
      theme={AppTheme}>
      <RootNavigator />
    </NavigationContainer>
  )
}

export default AppNavigator
