import { NotificationError, Type } from '@/types/NotificationError'

const useUtils = (): {
  delay: typeof delay
  setError: typeof setError
  resetError: typeof resetError
} => {
  const delay = (amount = 2000) => {
    console.log(`Delay de ${amount / 1000} segundos para testes!`)
    return new Promise((resolve) => setTimeout(resolve, amount))
  }

  const setError = (
    error: boolean,
    type: Type,
    msg: string
  ): NotificationError => {
    const res: NotificationError = {
      error: error,
      type: type,
      msg: msg
    }
    return res
  }
  const resetError = (): NotificationError => {
    const res: NotificationError = {
      error: false,
      type: '',
      msg: ''
    }
    return res
  }

  return { delay, setError, resetError }
}

export default useUtils
