import { NavigatorScreenParams, RouteProp } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { AppRoute } from "@github/navigation/routes"
import { ITabParamList } from "@github/navigation/bottom-tab-navigator"

export type IRootParamList = {
  [AppRoute.BottomTab]: NavigatorScreenParams<ITabParamList>
}

type IRootRoute = keyof IRootParamList

export type IRootNavigationProp<R extends IRootRoute> = StackNavigationProp<IRootParamList, R>
export type IRootRoutProp<R extends IRootRoute> = RouteProp<IRootParamList, R>
