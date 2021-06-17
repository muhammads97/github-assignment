import { Dimensions, Platform as RNPlatform } from "react-native"
import {
  isIphoneX as _isIphoneX,
  getBottomSpace as _getBottomSpace,
  getStatusBarHeight as _getStatusBarHeight,
} from "react-native-iphone-x-helper"

export const IS_DEV_ENV = __DEV__ === true

export enum PlatformType {
  Ios = "ios",
  Android = "android",
  Web = "web",
  Windows = "windows",
  Macos = "macos",
}

export class Platform {
  public static readonly isIOS = RNPlatform.OS === PlatformType.Ios

  public static readonly isAndroid = RNPlatform.OS === PlatformType.Android

  public static readonly isIphoneX = _isIphoneX()

  public static readonly type = RNPlatform.OS

  public static readonly version = RNPlatform.Version

  public static getStatusBarHeight(withSafeArea = false): number {
    return _getStatusBarHeight(withSafeArea)
  }

  public static getBottomSpace(): number {
    return _getBottomSpace()
  }
}

export const screenWidth = Dimensions.get("screen").width
export const screenHeight = Dimensions.get("screen").height
export const windowWidth = Dimensions.get("window").width
export const windowHeight = Dimensions.get("window").height
