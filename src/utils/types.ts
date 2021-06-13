import React from "react"
import { ActionCreatorWithPreparedPayload } from "@reduxjs/toolkit"

// Trick to ensure this type accept strict empty object only.
// since any object is a child from empty object.
export interface IEmpty {
  _?: never
}

// FIXME: Is there a better way to define this?
export type IObject<T = unknown> = Record<string, T>

export type ChildrenProp = React.ReactNode

export type ExtractActionType<TAction> = TAction extends ActionCreatorWithPreparedPayload<
  infer TArgs,
  infer TPayload,
  infer Type,
  infer TError,
  infer TMeta
>
  ? { type: Type; payload: TPayload; meta: TMeta }
  : TAction

export type Nullable<T> = T | null | undefined

export type SnakeToCamelCase<S extends string> = S extends `${infer T}_${infer U}`
  ? `${Lowercase<T>}${Capitalize<SnakeToCamelCase<U>>}`
  : S

export type CamelToSnakeCase<S extends string> = S extends `${infer T}${infer U}`
  ? `${T extends Capitalize<T> ? "_" : ""}${Lowercase<T>}${CamelToSnakeCase<U>}`
  : S

export type SnakeKeysToCamelCase<T> = T extends Array<infer U>
  ? SnakeKeysToCamelCase<U>[]
  : T extends object
  ? {
      [K in keyof T as SnakeToCamelCase<K & string>]: SnakeKeysToCamelCase<T[K]>
    }
  : T

export type CamelKeysToSnakeCase<T> = T extends Array<infer U>
  ? CamelKeysToSnakeCase<U>[]
  : T extends object
  ? {
      [K in keyof T as CamelToSnakeCase<K & string>]: CamelKeysToSnakeCase<T[K]>
    }
  : T
