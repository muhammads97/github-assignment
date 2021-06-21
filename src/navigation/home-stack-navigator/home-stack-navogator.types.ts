import { CompositeNavigationProp, RouteProp } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { AppRoute } from "@github/navigation/routes"
import { ITabParamList } from "@github/navigation/bottom-tab-navigator"

export type IHomeParamList = {
  [AppRoute.Home]: {}
  [AppRoute.Search]: {}
}

type IHomeRoute = keyof IHomeParamList

// export type IHomeNavigationProp<R extends IHomeRoute> = StackNavigationProp<IHomeParamList, R>
export type IHomeNavigationProp<R extends IHomeRoute> = CompositeNavigationProp<
  StackNavigationProp<IHomeParamList, R>,
  BottomTabNavigationProp<ITabParamList, AppRoute.Home>
>
export type IHomeRoutProp<R extends IHomeRoute> = RouteProp<IHomeParamList, R>
