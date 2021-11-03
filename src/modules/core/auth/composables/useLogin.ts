import { ref } from 'vue'
import useAuthErrors from './useAuthErrors'
import useUtils from '@/composables/useUtils'
import {
  getAuth,
  signInWithEmailAndPassword,
  UserInfo
} from '@/plugins/firebase'
import { NotificationError } from '@/types/NotificationError'
import Auth from '../types/Auth'

const { searchError } = useAuthErrors()
const { delay, setError, resetError } = useUtils()
const error = ref<NotificationError>({ error: false })
const isPending = ref(false)

const login = async (formData: Auth): Promise<UserInfo | unknown> => {
  isPending.value = true
  error.value = resetError()
  const { email, password } = formData
  const auth = getAuth()

  try {
    const res = await signInWithEmailAndPassword(auth, email, password)
    if (!res) {
      throw new Error('Erro')
    }
    await delay(2000)
    error.value = setError(
      true,
      'success',
      'Logado com sucesso. Aguarde ser redirecionado'
    )
    isPending.value = false
    return res.user
  } catch (err: any) {
    await delay(10000)
    isPending.value = false
    error.value = setError(true, 'error', searchError(err.code))
  }
}

const useLogin = (): {
  error: typeof error
  isPending: typeof isPending
  login: typeof login
} => {
  return { error, isPending, login }
}

export default useLogin
