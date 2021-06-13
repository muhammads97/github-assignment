import reducers from "./reducers"

export type IReducers = typeof reducers

// Global App State
export type IAppState = { [key in keyof IReducers]: ReturnType<IReducers[key]> }

export * from "./ducks/ducks.types"
