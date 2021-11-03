import { ref } from 'vue'
import useAuthErrors from './useAuthErrors'
import useUtils from '@/composables/useUtils'
import { getAuth, sendPasswordResetEmail } from '@/plugins/firebase'
import { NotificationError } from '@/types/NotificationError'
import Auth from '../types/Auth'

const { searchError } = useAuthErrors()
const error = ref<NotificationError>({ error: false })
const isPending = ref(false)

const reset = async (formData: Auth): Promise<void> => {
  isPending.value = true
  error.value.error = false
  const { delay, setError } = useUtils()
  const { email } = formData
  const auth = getAuth()

  try {
    await delay(2000)
    await sendPasswordResetEmail(auth, email)
    isPending.value = false
    error.value = setError(
      true,
      'success',
      'Foi enviado um email com o link para a redefinição'
    )
  } catch (err: any) {
    await delay(2000)
    isPending.value = false
    error.value = setError(true, 'error', searchError(err.code))
    console.log(error.value)
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
