import { ref } from 'vue'
import useAuthErrors from './useAuthErrors'
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
  isPending.value = true
  error.value.error = false
  const { email, password, displayName } = formData
  const auth = getAuth()
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password)
    if (!res) {
      throw new Error('Erro')
    }
    await updateProfile(res.user, { displayName })
    isPending.value = false
    error.value = { error: false, msg: 'Cadastro efetuado.' }
    return res.user
  } catch (err: any) {
    console.log(err)
    isPending.value = false
    error.value = {
      error: true,
      msg: searchError(err.code),
      type: 'error'
    }
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
