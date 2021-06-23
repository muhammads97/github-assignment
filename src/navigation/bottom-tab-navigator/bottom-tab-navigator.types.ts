import { NavigatorScreenParams, RouteProp } from "@react-navigation/native"
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { AppRoute } from "@github/navigation/routes"
import { IHomeParamList } from "@github/navigation/home-stack-navigator/home-stack-navogator.types"

export type ITabParamList = {
  [AppRoute.Home]: NavigatorScreenParams<IHomeParamList>
  [AppRoute.Profile]: undefined
}

type ITabRoute = keyof ITabParamList

export type ITabNavigationProp<R extends ITabRoute> = BottomTabNavigationProp<ITabParamList, R>
export type ITabRoutProp<R extends ITabRoute> = RouteProp<ITabParamList, R>
