export interface Auth {
  email: string
  password: string
  passwordConfirm?: string
  displayName?: string
}
export interface User {
  uid: string
  displayName: string
  email: string
}
