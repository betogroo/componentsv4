import { ref } from 'vue'
import useAuthErrors from './useAuthErrors'
import useUtils from '@/composables/useUtils'
import {
  getAuth,
  signInWithEmailAndPassword,
  UserInfo
} from '@/plugins/firebase'
import { Notification } from '@/types/Notification'
import Auth from '../types/Auth'

const { searchError } = useAuthErrors()
const { delay, setError, resetNotification } = useUtils()
const error = ref<Notification>(resetNotification())
const isPending = ref(false)

const login = async (formData: Auth): Promise<UserInfo | unknown> => {
  isPending.value = true
  error.value = resetNotification()
  const { email, password } = formData
  const auth = getAuth()

  try {
    const res = await signInWithEmailAndPassword(auth, email, password)
    if (!res) {
      throw new Error('Erro')
    }
    await delay(2000)
    error.value = setError(
      'success',
      'Logado com sucesso. Aguarde ser redirecionado'
    )
    isPending.value = false
    await delay(2000)
    error.value = resetNotification()
    return res.user
  } catch (err: any) {
    console.log(err.code)
    isPending.value = false
    error.value = setError('error', searchError(err.code))
    await delay(2000)
    error.value = resetNotification()
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
