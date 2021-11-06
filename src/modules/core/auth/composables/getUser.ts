import { ref } from 'vue'
import { UserInfo, onAuthStateChanged, getAuth } from '@/plugins/firebase'
const auth = getAuth()
const user = ref<UserInfo | null>(auth.currentUser)

onAuthStateChanged(auth, (_user) => {
  if (_user) {
    console.log('_user ->', _user)
    user.value = _user
  }
})

const getUser = (): {
  user: typeof user
  auth: typeof auth
} => {
  return { user, auth }
}

export default getUser
