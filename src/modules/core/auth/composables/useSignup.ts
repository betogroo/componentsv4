import { ref } from 'vue'
import useAuthErrors from './useAuthErrors'
import useUtils from '@/composables/useUtils'
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  UserInfo
} from '@/plugins/firebase'
import { NotificationError } from '@/types/NotificationError'
import Auth from '../types/Auth'

const { searchError } = useAuthErrors()
const error = ref<NotificationError>({ error: false })
const isPending = ref(false)

const signup = async (formData: Auth): Promise<UserInfo | unknown> => {
  const { setError, delay } = useUtils()
  isPending.value = true
  error.value.error = false
  const { email, password, displayName } = formData
  const auth = getAuth()
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password)
    if (!res) {
      throw 'Erro'
    }
    await updateProfile(res.user, { displayName })
    isPending.value = false
    error.value = setError(true, 'success', 'Cadastro efetuado com sucesso')
    await delay(2000)
    return res.user
  } catch (err: any) {
    console.log(err)
    isPending.value = false
    error.value = setError(true, 'error', searchError(err.code))
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
