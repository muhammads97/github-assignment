import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Image } from "react-native"
import { AppRoute } from "@github/navigation/routes"
import dummyComponent from "@github/views/dummy-component"
import color from "@github/res/color"
import image from "@github/assets/images"
import { ITabParamList } from "./bottom-tab-navigator.types"

const Tab = createBottomTabNavigator<ITabParamList>()

export default () => (
  <Tab.Navigator
    initialRouteName={AppRoute.Home}
    screenOptions={{
      headerShown: false,
      tabBarLabelStyle: {
        fontSize: 12,
      },
      tabBarStyle: {
        backgroundColor: color.statusBar,
        padding: 20,
        borderTopWidth: 0,
      },
    }}>
    <Tab.Screen
      name={AppRoute.Home}
      component={dummyComponent}
      options={{
        tabBarIcon: () => <Image source={image.home} style={{ marginBottom: 10 }} />,
      }}
    />
    <Tab.Screen
      name={AppRoute.Profile}
      component={dummyComponent}
      options={{
        tabBarIcon: () => <Image source={image.people} style={{ marginBottom: 10 }} />,
      }}
    />
  </Tab.Navigator>
)
