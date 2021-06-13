import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { AppRoute } from "@github/navigation/routes"
import { Screen } from "@github-shared"
import { IRootParamList } from "./root-navigator.types"

const RootStack = createStackNavigator<IRootParamList>()

// TODO: Just an example. Should be removed
const TestComponent = () => {
  return <Screen preset="fixedStack" />
}

const RootNavigator = () => {
  return (
    <RootStack.Navigator initialRouteName={AppRoute.Test} screenOptions={{ headerShown: false }}>
      <RootStack.Screen name={AppRoute.Test} component={TestComponent} />
      {/* <RootStack.Group screenOptions={{ presentation: "modal" }}>
        {// any modal screen  }
      </RootStack.Group> */}
    </RootStack.Navigator>
  )
}

export default RootNavigator
