<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <input v-model="formData.email" type="email" />
      <button type="submit">Redefinir</button>
      <AuthFormLink
        text="Ainda não em cadastro?"
        textLink="Cadastre-se"
        :to="{ name: 'Welcome', params: { mode: 'signup' } }"
      />
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import AuthFormLink from './AuthFormLink.vue'
import Auth from '../types/Auth'

export default defineComponent({
  name: 'ResetPasswordForm',

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
