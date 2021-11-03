import { Notification, NotificationType } from '@/types/Notification'

const useUtils = (): {
  delay: typeof delay
  setError: typeof setError
  resetNotification: typeof resetNotification
} => {
  const delay = (amount = 2000) => {
    console.log(`Delay de ${amount / 1000} segundos para testes!`)
    return new Promise((resolve) => setTimeout(resolve, amount))
  }

  const setError = (type: NotificationType, msg: string): Notification => {
    const res: Notification = {
      type: type,
      msg: msg
    }
    return res
  }
  const resetNotification = (): Notification => {
    return {
      type: '',
      msg: ''
    }
  }

  return { delay, setError, resetNotification }
}

export default useUtils
