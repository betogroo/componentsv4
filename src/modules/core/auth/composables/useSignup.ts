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
import { Auth } from '../types/Auth'
const { setNotification, delay, resetNotification } = useUtils()
const { searchError } = useAuthErrors()

const error = ref<boolean | null>(null)
const notification = ref<Notification>(resetNotification())
const isPending = ref(false)

const signup = async (formData: Auth): Promise<UserInfo | unknown> => {
  isPending.value = true
  error.value = null
  notification.value = resetNotification()
  const { email, password, displayName } = formData
  const auth = getAuth()
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password)

    if (!res) {
      throw { code: 'auth/default-error' }
    }
    await updateProfile(res.user, { displayName })
    isPending.value = false
    notification.value = setNotification(
      'success',
      'Cadastro efetuado com sucesso'
    )
    await delay(2000)
    notification.value = resetNotification()
    error.value = false
    return res.user
  } catch (err: any) {
    console.log(err.code)
    isPending.value = false
    notification.value = setNotification('error', searchError(err.code))
    await delay(2000)
    error.value = true
    notification.value = resetNotification()
  } finally {
    isPending.value = false
  }
}

const useSignup = (): {
  error: typeof error
  notification: typeof notification
  isPending: typeof isPending
  signup: typeof signup
} => {
  return { error, notification, isPending, signup }
}

export default useSignup
