import AsyncStorage from "@react-native-async-storage/async-storage"
import { Reactotron } from "@github/services/reactotron"

class AppStorage {
  public async storeItem(
    key: string,
    value: string,
    callback?: (error?: Error) => void,
  ): Promise<void> {
    try {
      await AsyncStorage.setItem(key, value, callback)
    } catch (error) {
      Reactotron.log(error)
    }
  }

  public async getItem(
    key: string,
    callback?: (error?: Error, result?: string) => void,
  ): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(key, callback)
    } catch (error) {
      Reactotron.log(error)
      return null
    }
  }
}

export default new AppStorage()
export { AsyncStorage }
