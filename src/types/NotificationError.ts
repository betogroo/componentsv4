export type Type = 'primary' | 'error' | 'success' | ''
export interface NotificationError {
  error: boolean
  type?: Type | null
  msg?: string
}
