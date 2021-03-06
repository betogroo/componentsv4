import {
  RouteRecordRaw,
  NavigationGuardNext,
  RouteLocationNormalized
} from 'vue-router'
import Welcome from './views/Welcome.vue'
import Profile from './views/Profile.vue'

const validateParam = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): void => {
  const validParams = ['login', 'signup', 'reset', '']
  // const mode = to.params.mode as string
  if (validParams.includes(to.params.mode as string)) {
    next()
  } else {
    next({ path: '/welcome' })
  }
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/welcome/:mode?',
    name: 'Welcome',
    component: Welcome,
    meta: {
      title: 'Welcome',
      requiresAuth: false,
      hideNav: true
    },
    props: (route) => ({ mode: route.params.mode || 'login' }),
    beforeEnter: validateParam
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      requiresAuth: true,
      title: 'Profile'
    }
  }
]

export default routes
