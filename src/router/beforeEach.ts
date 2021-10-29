//import { fbAuth } from '@/plugins/firebase'
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { getAuth } from '@/plugins/firebase'

export default (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): void => {
  //const user = { displayName: 'Beto', uid: 'sadaduiyad789ad789a' }
  const user = getAuth().currentUser
  console.log(user)
  console.log(to.meta)

  // if (to.name !== 'Welcome' && !user) {
  if (to.meta.requiresAuth && !user) {
    next({ name: 'Welcome' })
  } else if (to.name === 'Welcome' && user) {
    next({ name: 'Home' })
  } else {
    next()
  }
}
