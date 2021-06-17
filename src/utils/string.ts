import { SnakeToCamelCase, CamelToSnakeCase } from "./types"

export const capitalize = <S extends string>(str: S): Capitalize<S> =>
  (str.charAt(0).toUpperCase() + str.slice(1)) as Capitalize<S>

export const snakeToCamel = <S extends string>(str: S): SnakeToCamelCase<S> => {
  const words = str.split("_")
  return words.reduce((result, word) => {
    if (result.length === 0) {
      return word
    }

    return result + capitalize(word)
  }, "") as SnakeToCamelCase<S>
}

export const camelToSnake = <S extends string>(str: S): CamelToSnakeCase<S> =>
  str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`) as CamelToSnakeCase<S>
