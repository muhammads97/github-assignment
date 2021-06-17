import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { AppRoute } from "@github/navigation/routes"
import dummyComponent from "@github/views/dummy-component"
import { IHomeParamList } from "./home-stack-navogator.types"

const HomeStack = createStackNavigator<IHomeParamList>()

const RootNavigator = () => (
  <HomeStack.Navigator initialRouteName={AppRoute.Home} screenOptions={{ headerShown: false }}>
    <HomeStack.Screen name={AppRoute.Home} component={dummyComponent} />
    <HomeStack.Screen name={AppRoute.Search} component={dummyComponent} />
    {/* <RootStack.Group screenOptions={{ presentation: "modal" }}>
        {// any modal screen  }
      </RootStack.Group> */}
  </HomeStack.Navigator>
)

export default RootNavigator
