import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { AppRoute } from "@github/navigation/routes"
import { TabNavigator } from "@github/navigation/bottom-tab-navigator"
import { IRootParamList } from "./root-navigator.types"

const RootStack = createStackNavigator<IRootParamList>()

const RootNavigator = () => (
  <RootStack.Navigator initialRouteName={AppRoute.BottomTab} screenOptions={{ headerShown: false }}>
    <RootStack.Screen name={AppRoute.BottomTab} component={TabNavigator} />
    {/* <RootStack.Group screenOptions={{ presentation: "modal" }}>
        {// any modal screen  }
      </RootStack.Group> */}
  </RootStack.Navigator>
)

export default RootNavigator
