import { createApp, RendererElement } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import { onAuthStateChanged, getAuth } from '@/plugins/firebase'

let app: RendererElement
const auth = getAuth()

onAuthStateChanged(auth, () => {
  if (!app) {
    app = createApp(App).use(store).use(router).mount('#app')
  }
})
