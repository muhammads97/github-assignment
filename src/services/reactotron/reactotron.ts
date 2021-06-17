import { Monitor } from "apisauce"
import { default as Tron } from "reactotron-react-native"
import { reactotronRedux } from "reactotron-redux"
import sagaPlugin from "reactotron-redux-saga"
// @ts-ignore No types provided
import ReactotronFlipper from "reactotron-react-native/dist/flipper"
// @ts-ignore Package Types Path isn't configured
import apisaucePlugin from "reactotron-apisauce"
import { AsyncStorage } from "@github/services/storage"
import { IS_DEV_ENV } from "@github/utils"

declare module "reactotron-core-client" {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  export interface Reactotron {
    apisauce?: ReturnType<ReturnType<typeof apisaucePlugin>>["features"]["apisauce"]
  }
}

class Reactotron {
  private tron: typeof Tron | null = null

  public constructor() {
    this.setup()
  }

  private setup() {
    if (!IS_DEV_ENV) {
      return
    }

    this.tron = Tron.setAsyncStorageHandler(AsyncStorage)
      .configure({
        createSocket: (path) => new ReactotronFlipper(path),
      })
      .useReactNative()
      .use(reactotronRedux())
      .use(apisaucePlugin())
      .use(sagaPlugin())
      .connect()
  }

  public log(...args: unknown[]) {
    this.tron?.log && this.tron.log(...args)
  }

  public warn(message: string) {
    this.tron?.warn && this.tron.warn(message)
  }

  public error(error: Error, message?: string) {
    this.tron?.error && this.tron.error(message ?? error.name, error)
  }

  public benchmark(title: string) {
    return this.tron?.benchmark && this.tron.benchmark(title)
  }

  public createSagaMonitor() {
    return this.tron?.createSagaMonitor && this.tron.createSagaMonitor()
  }

  public createEnhancer() {
    return this.tron?.createEnhancer && this.tron.createEnhancer()
  }

  public get apiMonitor(): Monitor | undefined {
    return this.tron?.apisauce
  }
}

export default new Reactotron()
