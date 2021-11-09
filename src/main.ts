import { createApp, RendererElement } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import { onAuthStateChanged, getAuth } from '@/plugins/firebase'

import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
const requireComponent = require.context(
  './components/app',
  false,
  /App[A-Z]\w+\.(vue|js)$/
)

let app: RendererElement
const auth = getAuth()

onAuthStateChanged(auth, () => {
  if (!app) {
    app = createApp(App)
    // eslint-disable-next-line
    requireComponent.keys().forEach((fileName: any) => {
      const componentConfig = requireComponent(fileName)
      const componentName = upperFirst(
        camelCase(
          fileName
            .split('/')
            .pop()
            .replace(/\.\w+$/, '')
        )
      )

      app.component(componentName, componentConfig.default || componentConfig)
    })

    app.use(store).use(router).mount('#app')
  }
})
