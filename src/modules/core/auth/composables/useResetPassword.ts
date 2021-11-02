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
      error: false,
      msg: 'Logado'
    }
  } catch (err: any) {
    console.log(err.code)
    isPending.value = false
    error.value = {
      error: true,
      msg: searchError(err.code)
    }
  }
}

const useLogin = (): {
  error: typeof error
  isPending: typeof isPending
  reset: typeof reset
} => {
  return { error, isPending, reset }
}

export default useLogin
