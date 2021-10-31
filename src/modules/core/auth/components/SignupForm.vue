<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <input v-model="formData.displayName" type="text" />
      <input v-model="formData.email" type="email" />
      <input v-model="formData.password" type="password" />
      <input v-model="formData.passwordConfirm" type="password" />
      <button type="submit">Cadastrar</button>
      <AuthFormLink
        text="Já é cadastrado?"
        textLink="Faça login"
        :to="{ name: 'Welcome', params: { mode: 'login' } }"
      />
      <AuthFormLink
        text="Esqueceu a senha?"
        textLink="Redefina"
        :to="{ name: 'Welcome', params: { mode: 'reset' } }"
      />
    </form>
    <div>
      <h1 v-if="isPending">...</h1>
      <h1 v-if="error.error">{{ error.msg }}</h1>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import AuthFormLink from './AuthFormLink.vue'
import useSignup from '../composables/useSignup'
import Auth from '../types/Auth'

export default defineComponent({
  name: 'SignupForm',

  components: {
    AuthFormLink
  },

  setup() {
    const router = useRouter()
    const { error, signup, isPending } = useSignup()
    const formData = ref<Auth>({
      email: 'betogarcia@gmail.com',
      password: '123456',
      passwordConfirm: '123456',
      displayName: 'Beto Garcia'
    })

    const handleSubmit = async () => {
      await signup(formData.value)
      if (!error.value.error) {
        router.push({ name: 'Profile' })
      }
    }

    return { formData, handleSubmit, error, signup, isPending }
  }
})
</script>

<style scoped></style>
