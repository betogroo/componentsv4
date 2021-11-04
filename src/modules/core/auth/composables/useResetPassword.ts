import { ref } from 'vue'
import useAuthErrors from './useAuthErrors'
import useUtils from '@/composables/useUtils'
import { getAuth, sendPasswordResetEmail } from '@/plugins/firebase'
import { Notification } from '@/types/Notification'
import { Auth } from '../types/Auth'

const { searchError } = useAuthErrors()
const { delay, setNotification, resetNotification } = useUtils()

const error = ref<boolean | null>(null)
const notification = ref<Notification>(resetNotification())
const isPending = ref(false)

const reset = async (formData: Auth): Promise<void> => {
  isPending.value = true
  error.value = null
  notification.value = resetNotification()
  const { email } = formData
  const auth = getAuth()

  try {
    await delay(2000)
    await sendPasswordResetEmail(auth, email)
    isPending.value = false
    notification.value = setNotification(
      'success',
      'Foi enviado um email com o link para a redefinição'
    )
    await delay(2000)
    notification.value = resetNotification()
    error.value = false
  } catch (err: any) {
    console.log(err.code)
    isPending.value = false
    notification.value = setNotification('error', searchError(err.code))
    await delay(2000)
    error.value = true
    console.log(err.code)
    notification.value = resetNotification()
  }
}

const useResetPassword = (): {
  error: typeof error
  notification: typeof notification
  isPending: typeof isPending
  reset: typeof reset
} => {
  return { error, notification, isPending, reset }
}

export default useResetPassword
