import { ref } from 'vue'
import useAuthErrors from './useAuthErrors'
import useUtils from '@/composables/useUtils'
import {
  getAuth,
  signInWithEmailAndPassword,
  FirebaseError
} from '@/plugins/firebase'
import { Notification } from '@/types/Notification'
import { Auth } from '../types/Auth'

const { authError } = useAuthErrors()
const { delay, setNotification, resetNotification } = useUtils()

const error = ref<boolean>(false)
const notification = ref<Notification>(resetNotification())
const isPending = ref(false)

const login = async (formData: Auth) => {
  isPending.value = true
  error.value = false
  notification.value = resetNotification()
  const { email, password } = formData
  const auth = getAuth()

  try {
    const res = await signInWithEmailAndPassword(auth, email, password)
    if (!res) {
      throw new FirebaseError('auth/default-error', 'Erro Default')
    }
    await delay(2000, true)
    notification.value = setNotification(
      'success',
      'Logado com sucesso. Aguarde ser redirecionado'
    )
    isPending.value = false
    await delay(2000)
    notification.value = resetNotification()
    return res.user
  } catch (e) {
    const err: FirebaseError = e
    error.value = true
    console.log(err.code)
    isPending.value = false
    notification.value = setNotification('error', authError(err.code))
    await delay(2000)
    notification.value = resetNotification()
  }
}

const useLogin = (): {
  error: typeof error
  notification: typeof notification
  isPending: typeof isPending
  login: typeof login
} => {
  return { error, notification, isPending, login }
}

export default useLogin
