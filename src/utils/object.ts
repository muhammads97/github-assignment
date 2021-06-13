import { camelToSnake, snakeToCamel } from "./string"
import { CamelKeysToSnakeCase, SnakeKeysToCamelCase } from "./types"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isObject = (arg: any): arg is object => arg !== null && typeof arg === "object"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isArray = (arg: any): arg is any[] => Array.isArray(arg)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isNullish = (arg: any): arg is null | undefined => arg === null || arg === undefined

export const snakeKeysToCamel = <T extends object>(object: T): SnakeKeysToCamelCase<T> => {
  if (isArray(object)) {
    return object.map((value: object) => snakeKeysToCamel(value)) as SnakeKeysToCamelCase<T>
  } else if (isObject(object)) {
    return Object.keys(object).reduce((newObject, key) => {
      const camelKey = snakeToCamel(key)
      //@ts-ignore FIXME
      newObject[camelKey] = snakeKeysToCamel(object[key])
      return newObject
    }, {}) as SnakeKeysToCamelCase<T>
  }

  return object as SnakeKeysToCamelCase<T>
}

export const camelKeysToSnake = <T extends object>(object: T): CamelKeysToSnakeCase<T> => {
  if (isArray(object)) {
    return object.map((value: object) => camelKeysToSnake(value)) as CamelKeysToSnakeCase<T>
  } else if (isObject(object)) {
    return Object.keys(object).reduce((newObject, key) => {
      const snakeKey = camelToSnake(key)
      //@ts-ignore FIXME
      newObject[snakeKey] = camelKeysToSnake(object[key])
      return newObject
    }, {}) as CamelKeysToSnakeCase<T>
  }

  return object as CamelKeysToSnakeCase<T>
}
