import { ref } from 'vue'
import useAuthErrors from './useAuthErrors'
import useUtils from '@/composables/useUtils'
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  UserInfo
} from '@/plugins/firebase'
import { Notification } from '@/types/Notification'
import Auth from '../types/Auth'
const { setError, delay, resetNotification } = useUtils()
const { searchError } = useAuthErrors()
const error = ref<Notification>(resetNotification())
const isPending = ref(false)

const signup = async (formData: Auth): Promise<UserInfo | unknown> => {
  const { setError, delay } = useUtils()
  isPending.value = true
  error.value = resetNotification()
  const { email, password, displayName } = formData
  const auth = getAuth()
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password)
    if (!res) {
      throw 'Erro'
    }
    await updateProfile(res.user, { displayName })
    isPending.value = false
    error.value = setError('success', 'Cadastro efetuado com sucesso')
    await delay(2000)
    error.value = resetNotification()
    return res.user
  } catch (err: any) {
    console.log(err.code)
    isPending.value = false
    error.value = setError('error', searchError(err.code))
    await delay(2000)
    error.value = resetNotification()
  } finally {
    isPending.value = false
  }
}

const useSignup = (): {
  error: typeof error
  isPending: typeof isPending
  signup: typeof signup
} => {
  return { error, isPending, signup }
}

export default useSignup
