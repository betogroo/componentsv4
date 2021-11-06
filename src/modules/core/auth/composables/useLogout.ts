import { ref } from 'vue'
import useAuthErrors from './useAuthErrors'
import useUtils from '@/composables/useUtils'
import { getAuth, signOut } from '@/plugins/firebase'
import { Notification } from '@/types/Notification'

const { searchError } = useAuthErrors()
const { setNotification, resetNotification } = useUtils()

const error = ref<boolean | null>(null)
const notification = ref<Notification>(resetNotification())
const isPending = ref(false)

const logout = async (): Promise<void> => {
  isPending.value = true
  error.value = null
  notification.value = resetNotification()
  const auth = getAuth()
  try {
    await signOut(auth)
    notification.value = setNotification('success', 'logou mano')
    error.value = false
  } catch (err: any) {
    console.log(err.code)
    error.value = err.code
    notification.value = setNotification('error', searchError(err.code))
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
