import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { AppRoute } from "@github/navigation/routes"
import { HomeScreen, Header as HomeHeader } from "@github/views/home-component"
import { SearchScreen, Header as SearchHeader } from "@github/views/search-component"

import { IHomeParamList } from "./home-stack-navogator.types"

const HomeStack = createStackNavigator<IHomeParamList>()

const HomeStackNavigator = () => (
  <HomeStack.Navigator initialRouteName={AppRoute.Home}>
    <HomeStack.Screen
      name={AppRoute.Home}
      component={HomeScreen}
      options={({ navigation }) => ({
        header: () => <HomeHeader navigation={navigation} />,
      })}
    />
    <HomeStack.Screen
      name={AppRoute.Search}
      component={SearchScreen}
      options={({ navigation }) => ({
        header: () => <SearchHeader navigation={navigation} />,
      })}
    />
    {/* <RootStack.Group screenOptions={{ presentation: "modal" }}>
        {// any modal screen  }
      </RootStack.Group> */}
  </HomeStack.Navigator>
)

export default HomeStackNavigator
