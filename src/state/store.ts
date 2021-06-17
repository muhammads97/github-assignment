import Logger from "redux-logger"
import { persistStore } from "redux-persist"
import createSagaMiddleware from "redux-saga"
import { configureStore, Middleware } from "@reduxjs/toolkit"
import Reactotron from "@github/services/reactotron/reactotron"
import { IS_DEV_ENV } from "@github/utils"
import initialState from "./initial-state"
import appReducer from "./root-reducer"
import rootSaga from "./root-saga"

const configureAppStore = () => {
  // Reactotron & Saga configuration
  const sagaMonitor = Reactotron.createSagaMonitor()
  const sagaMiddleware = sagaMonitor
    ? createSagaMiddleware({ sagaMonitor })
    : createSagaMiddleware()

  const middlewares: [Middleware] = [sagaMiddleware]

  if (IS_DEV_ENV) {
    middlewares.push(Logger)
  }

  const tronEnhancer = Reactotron.createEnhancer()

  const appStore = configureStore({
    reducer: appReducer,
    middleware: middlewares,
    devTools: true,
    preloadedState: initialState,
    enhancers: tronEnhancer ? [tronEnhancer] : [],
  })

  sagaMiddleware.run(rootSaga)
  return appStore
}

const store = configureAppStore()
const persistor = persistStore(store)

export { store, persistor }
