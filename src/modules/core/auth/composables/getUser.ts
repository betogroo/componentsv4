import { ref } from 'vue'
import {
  User,
  NextOrObserver,
  onAuthStateChanged,
  getAuth
} from '@/plugins/firebase'
const auth = getAuth()
const user = ref<User | null>(auth.currentUser)

onAuthStateChanged(auth, (_user) => {
  if (_user) {
    console.log(_user)
    user.value = _user
  }
})

const getUser = () => {
  return { user }
}

export default getUser
