<template>
  <div>
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
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import AuthFormLink from './AuthFormLink.vue'
import Auth from '../types/Auth'

export default defineComponent({
  name: 'LoginForm',

  components: {
    AuthFormLink
  },
  setup() {
    const formData = ref<Auth>({
      email: '',
      password: ''
    })
    const handleSubmit = () => {
      console.log(formData.value)
    }
    return { formData, handleSubmit }
  }
})
</script>

<style scoped></style>
