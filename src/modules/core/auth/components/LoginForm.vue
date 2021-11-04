<template>
  <div>
    {{ error }}
    <form @submit.prevent="handleSubmit">
      <input type="email" v-model="formData.email" />
      <input type="password" v-model="formData.password" />
      <button type="submit">Entrar</button>
      <AuthFormLink
        text="Ainda não em cadastro?"
        textLink="Cadastre-se"
        :to="{ name: 'Welcome', params: { mode: 'signup' } }"
      />
      <AuthFormLink
        text="Esqueceu a senha?"
        textLink="Redefina"
        :to="{ name: 'Welcome', params: { mode: 'reset' } }"
      />
    </form>
    <div>
      <DefaultLoading v-if="isPending" />
      <DefaultNotification :type="notification.type" :text="notification.msg" />
    </div>
  </div>
</template>

<script lang="ts">
import useLogin from '../composables/useLogin'
import { defineComponent, ref } from 'vue'
import DefaultNotification from '@/components/layout/notification/DefaultNotification.vue'
import DefaultLoading from '@/components/layout/loading/DefaultLoading.vue'
import AuthFormLink from './AuthFormLink.vue'
import { Auth } from '../types/Auth'

export default defineComponent({
  name: 'LoginForm',

  components: {
    AuthFormLink,
    DefaultNotification,
    DefaultLoading
  },
  setup() {
    const { error, notification, isPending, login } = useLogin()
    const formData = ref<Auth>({
      email: 'betogroo@beto.com',
      password: '123456'
    })
    const handleSubmit = async (): Promise<void> => {
      await login(formData.value)
      if (!error.value) {
        console.log('user logged')
      }
    }
    return { formData, handleSubmit, error, notification, isPending }
  }
})
</script>
