import { ref } from 'vue'
import useAuthErrors from './useAuthErrors'
import useUtils from '@/composables/useUtils'
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  FirebaseError
} from '@/plugins/firebase'
import { Notification } from '@/types/Notification'
import { Auth } from '../types/Auth'
const { setNotification, delay, resetNotification } = useUtils()
const { authError } = useAuthErrors()

const error = ref<boolean | null>(null)
const notification = ref<Notification>(resetNotification())
const isPending = ref(false)

const signup = async (formData: Auth) => {
  isPending.value = true
  error.value = null
  notification.value = resetNotification()
  const { email, password, displayName } = formData
  const auth = getAuth()
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password)

    if (!res) {
      throw new FirebaseError('auth/default-error', 'Default error')
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
  } catch (e) {
    const err: FirebaseError = e
    console.log(err.code)
    isPending.value = false
    notification.value = setNotification('error', authError(err.code))
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
