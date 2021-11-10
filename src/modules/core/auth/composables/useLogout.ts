import { ref } from 'vue'
import useAuthErrors from './useAuthErrors'
import useUtils from '@/composables/useUtils'
import { getAuth, signOut, FirebaseError } from '@/plugins/firebase'
import { Notification } from '@/types/Notification'

const { authError } = useAuthErrors()
const { setNotification, resetNotification } = useUtils()

const error = ref<boolean | null>(null)
const notification = ref<Notification>(resetNotification())
const isPending = ref(false)

const logout = async () => {
  isPending.value = true
  error.value = null
  notification.value = resetNotification()
  const auth = getAuth()
  try {
    await signOut(auth)
    notification.value = setNotification('success', 'logou mano')
    error.value = false
  } catch (e) {
    const err: FirebaseError = e
    console.log(err.code)
    error.value = true
    notification.value = setNotification('error', authError(err.code))
  }
}

const useLogout = (): {
  error: typeof error
  notification: typeof notification
  isPending: typeof isPending
  logout: typeof logout
} => {
  return { error, notification, isPending, logout }
}

export default useLogout
