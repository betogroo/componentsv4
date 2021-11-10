import { ref } from 'vue'
import { onAuthStateChanged, getAuth } from '@/plugins/firebase'
import { User } from '@firebase/auth'
const auth = getAuth()
const user = ref(auth.currentUser)

onAuthStateChanged(auth, (_user: User | null) => {
  if (_user) {
    user.value = _user
  } else {
    user.value = null
  }
})

const getUser = (): {
  user: typeof user
} => {
  return { user }
}

export default getUser
