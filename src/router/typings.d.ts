import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth: boolean
    title?: string
    isAdmin?: boolean
    hideNav?: boolean
  }
}
