export type NotificationType = 'primary' | 'error' | 'success' | 'warning' | ''
export interface Notification {
  type?: NotificationType
  msg?: string
}
