import { Notification, NotificationType } from '@/types/Notification'

const useUtils = (): {
  delay: typeof delay
  setNotification: typeof setNotification
  resetNotification: typeof resetNotification
} => {
  const delay = (amount = 2000, msg = false) => {
    if (msg) {
      console.log(`Delay de ${amount / 1000} segundos para testes!`)
    }
    return new Promise((resolve) => setTimeout(resolve, amount))
  }

  const setNotification = (
    type: NotificationType,
    msg: string
  ): Notification => {
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

  return { delay, setNotification, resetNotification }
}

export default useUtils
