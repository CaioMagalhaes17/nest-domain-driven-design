export type UserClientSignUpDTO = {
  name: string
  login: string
  password: string
  isStore: boolean
  permission?: string
}

export type UserStoreSignupDTO = {
  name: string
  login: string
  password: string
  isStore: boolean
  telNum: string
  address: string
  location: {
    lat: number
    lng: number
  }
  permission?: string
}
