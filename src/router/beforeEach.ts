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
  //const user = null

  // if (to.name !== 'Welcome' && !user) {
  if (to.meta.requiresAuth && !user) {
    console.log(`Não pode acessar ${to.meta.title} sem se logar`)
    next({ name: 'Welcome' })
  } else if (to.name === 'Welcome' && user) {
    console.log(`vc está logado, nao adianta tentar acessar ${to.meta.title}`)
    next({ name: 'Home' })
  } else {
    console.log('uhu., tali berado')
    next()
  }
}
