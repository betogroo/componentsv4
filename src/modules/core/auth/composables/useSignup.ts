import { ref } from 'vue'
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  UserCredential
} from '@/plugins/firebase'
import useAuthErrors from './useAuthErrors'
import useUtils from '@/composables/useUtils'
import { Error as DisplayError } from '../types/Error'
import Auth from '../types/Auth'

const { delay } = useUtils()
const { searchError } = useAuthErrors()
const error = ref<DisplayError>({ error: false })
const isPending = ref(false)

const signup = async (formData: Auth): Promise<UserCredential | undefined> => {
  isPending.value = true
  error.value.error = false
  await delay(1)
  const { email, password, displayName } = formData
  const auth = getAuth()
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password)
    if (!res) {
      throw 'Erro'
    }
    await updateProfile(res.user, { displayName })
    isPending.value = false
    error.value.error = false
    console.log(res)
    return res
  } catch (err: any) {
    isPending.value = false
    console.log(err.code)
    error.value = {
      error: true,
      msg: searchError(err.code)
    }
  }
}

const useSignup = (): any => {
  return { error, isPending, signup }
}

export default useSignup
