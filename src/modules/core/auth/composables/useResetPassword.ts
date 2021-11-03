import { ref } from 'vue'
import useAuthErrors from './useAuthErrors'
import useUtils from '@/composables/useUtils'
import { getAuth, sendPasswordResetEmail } from '@/plugins/firebase'
import { Notification } from '@/types/Notification'
import Auth from '../types/Auth'

const { searchError } = useAuthErrors()
const { delay, setError, resetNotification } = useUtils()
const error = ref<Notification>(resetNotification())
const isPending = ref(false)

const reset = async (formData: Auth): Promise<void> => {
  isPending.value = true
  error.value = resetNotification()
  const { email } = formData
  const auth = getAuth()

  try {
    await delay(2000)
    await sendPasswordResetEmail(auth, email)
    isPending.value = false
    error.value = setError(
      'success',
      'Foi enviado um email com o link para a redefinição'
    )
  } catch (err: any) {
    console.log(err.code)
    isPending.value = false
    error.value = setError('error', searchError(err.code))
    await delay(2000)
    console.log(err.code)
    error.value = resetNotification()
  }
}

const useResetPassword = (): {
  error: typeof error
  isPending: typeof isPending
  reset: typeof reset
} => {
  return { error, isPending, reset }
}

export default useResetPassword
