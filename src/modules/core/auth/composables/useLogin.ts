import { ref } from 'vue'
import useAuthErrors from './useAuthErrors'
import useUtils from '@/composables/useUtils'
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  getRedirectResult,
  signInWithRedirect,
  GoogleAuthProvider,
  FirebaseError
} from '@/plugins/firebase'
import { Notification } from '@/types/Notification'
import { Auth } from '../types/Auth'
import { UserCredential } from '@firebase/auth'

const { authError } = useAuthErrors()
const { delay, setNotification, resetNotification } = useUtils()

const error = ref<boolean>(false)
const isMobile = ref<boolean>(false)
const notification = ref<Notification>(resetNotification())
const isPending = ref(false)
const auth = getAuth()

const resetAll = () => {
  console.log('resetAll')
  error.value = false
  notification.value = resetNotification()
}

const login = async (formData: Auth) => {
  resetAll()
  isPending.value = true
  const { email, password } = formData

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
  } catch (err) {
    const e = err as FirebaseError
    error.value = true
    isPending.value = false
    notification.value = setNotification('error', authError(e.code))
    await delay(2000)
    notification.value = resetNotification()
  }
}

const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider()
  isPending.value = true
  resetAll()
  await delay(1500)

  try {
    let res: UserCredential | null
    if (isMobile.value) {
      await signInWithRedirect(auth, provider)
      res = await getRedirectResult(auth)
    } else {
      res = await signInWithPopup(auth, provider)
    }
    if (!res) {
      throw new FirebaseError('auth/default-error', 'Erro Default')
    }
    isPending.value = false
    notification.value = setNotification(
      'success',
      'Logado com sucesso pelo gugre . Aguarde ser redirecionado'
    )
    await delay(1000)
    resetAll()
    return res.user
  } catch (err) {
    const e = err as FirebaseError
    error.value = true
    isPending.value = false
    notification.value = setNotification('error', authError(e.code))
    await delay(2000)
    notification.value = resetNotification()
    console.log('Login com o google')
  }
}

const useLogin = (): {
  error: typeof error
  notification: typeof notification
  isPending: typeof isPending
  login: typeof login
  loginWithGoogle: typeof loginWithGoogle
} => {
  return { error, notification, isPending, login, loginWithGoogle }
}

export default useLogin
