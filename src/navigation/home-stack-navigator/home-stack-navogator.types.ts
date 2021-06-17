import { RouteProp } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { AppRoute } from "@github/navigation/routes"

export type IHomeParamList = {
  [AppRoute.Home]: undefined
  [AppRoute.Search]: undefined
}

type IHomeRoute = keyof IHomeParamList

export type IHomeNavigationProp<R extends IHomeRoute> = StackNavigationProp<IHomeParamList, R>
export type IHomeRoutProp<R extends IHomeRoute> = RouteProp<IHomeParamList, R>
