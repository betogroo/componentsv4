import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
// import { getAuth } from '@/plugins/firebase'
// const user = getAuth().currentUser

import getUser from '../modules/core/auth/composables/getUser'
const { user } = getUser()

export default (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): void => {
  if (to.meta.requiresAuth && !user.value) {
    console.log(`Não pode acessar ${to.meta.title} sem se logar`)
    next({ name: 'Welcome' })
  } else if (to.name === 'Welcome' && user.value) {
    console.log(`vc está logado, nao adianta tentar acessar ${to.meta.title}.`)
    next({ name: from.name || 'Home' })
  } else {
    next()
  }
}
