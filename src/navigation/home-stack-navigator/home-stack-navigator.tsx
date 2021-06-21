import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { AppRoute } from "@github/navigation/routes"
import dummyComponent from "@github/views/dummy-component"
import { HomeScreen } from "@github/views/home-component"
import { Header } from "@github/views/home-component/home-header"
import { IHomeParamList } from "./home-stack-navogator.types"

const HomeStack = createStackNavigator<IHomeParamList>()

const HomeStackNavigator = () => (
  <HomeStack.Navigator initialRouteName={AppRoute.Home}>
    <HomeStack.Screen
      name={AppRoute.Home}
      component={HomeScreen}
      options={({ navigation }) => ({
        header: () => <Header navigation={navigation} />,
      })}
    />
    <HomeStack.Screen name={AppRoute.Search} component={dummyComponent} />
    {/* <RootStack.Group screenOptions={{ presentation: "modal" }}>
        {// any modal screen  }
      </RootStack.Group> */}
  </HomeStack.Navigator>
)

export default HomeStackNavigator
