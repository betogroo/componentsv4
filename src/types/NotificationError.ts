type Type = 'primary' | 'error' | 'success'
export interface NotificationError {
  error: boolean
  msg?: string
  type?: Type
}
