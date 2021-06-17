import {
  SnakeKeysToCamelCase,
  snakeKeysToCamel,
  camelKeysToSnake,
  CamelKeysToSnakeCase,
} from "@github/utils"

export const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms))

export const parse = <U, T extends Array<U>>(str: string, ...values: T): string =>
  str.replace(/%s/g, () => {
    const value = String(values.shift())
    return value ?? ""
  })

export const snakeToCamelMapper = <D extends object>(data: D): SnakeKeysToCamelCase<D> =>
  snakeKeysToCamel(data)

export const camelToSnakeMapper = <D extends object>(data: D): CamelKeysToSnakeCase<D> =>
  camelKeysToSnake(data)

export const defaultMapper = snakeKeysToCamel as <D, R>(data: D) => R

export const defaultDataMapper = camelToSnakeMapper as <D, R>(data: D) => R
