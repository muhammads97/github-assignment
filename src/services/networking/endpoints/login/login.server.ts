export interface IServerLoginParams {
  user_name: string
  password: string
}

export interface IServerUser {
  id: string
  first_name: string
  last_name: string
  email: string
}

export interface ILoginServerPayload {
  data: IServerUser
}
