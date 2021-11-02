import { ref } from 'vue'
import useAuthErrors from './useAuthErrors'
import {
  getAuth,
  signInWithEmailAndPassword,
  UserInfo
} from '@/plugins/firebase'
import { NotificationError } from '@/types/NotificationError'
import Auth from '../types/Auth'

const { searchError } = useAuthErrors()
const error = ref<NotificationError>({ error: false })
const isPending = ref(false)

const login = async (formData: Auth): Promise<UserInfo | unknown> => {
  isPending.value = true
  error.value.error = false
  const { email, password } = formData
  const auth = getAuth()

  try {
    const res = await signInWithEmailAndPassword(auth, email, password)
    if (!res) {
      throw new Error('Erro')
    }
    isPending.value = false
    error.value = {
      error: false,
      msg: 'Logado'
    }
    return res.user
  } catch (err: any) {
    console.log(err.code)
    isPending.value = false
    error.value = {
      error: true,
      msg: searchError(err.code),
      type: 'success'
    }
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
