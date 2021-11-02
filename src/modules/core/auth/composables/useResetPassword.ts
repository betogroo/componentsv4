import { ref } from 'vue'
import useAuthErrors from './useAuthErrors'
import { getAuth, sendPasswordResetEmail } from '@/plugins/firebase'
import { NotificationError } from '@/types/NotificationError'
import Auth from '../types/Auth'

const { searchError } = useAuthErrors()
const error = ref<NotificationError>({ error: false })
const isPending = ref(false)

const reset = async (formData: Auth): Promise<void> => {
  isPending.value = true
  error.value.error = false
  const { email } = formData
  const auth = getAuth()

  try {
    await sendPasswordResetEmail(auth, email)
    isPending.value = false
    error.value = {
      error: true,
      msg: 'Foi enviado um email com o link para a redefinição',
      type: 'success'
    }
  } catch (err: any) {
    isPending.value = false
    error.value = {
      error: true,
      msg: searchError(err.code),
      type: 'error'
    }
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
