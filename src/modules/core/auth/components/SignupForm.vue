<template>
  <div>
    {{ error }}
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
      <DefaultLoading v-if="isPending" />
      <DefaultNotification :text="notification.msg" :type="notification.type" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import useSignup from '../composables/useSignup'
import DefaultNotification from '@/components/layout/notification/DefaultNotification.vue'
import DefaultLoading from '@/components/layout/loading/DefaultLoading.vue'
import AuthFormLink from './AuthFormLink.vue'
import { Auth } from '../types/Auth'

export default defineComponent({
  name: 'SignupForm',

  components: {
    AuthFormLink,
    DefaultNotification,
    DefaultLoading
  },

  setup(props, { emit }) {
    const router = useRouter()
    const { error, notification, signup, isPending } = useSignup()
    const formData = ref<Auth>({
      email: 'betogarcia@gmail.com',
      password: '123456',
      passwordConfirm: '123456',
      displayName: 'Beto Garcia'
    })

    const handleSubmit = async () => {
      await signup(formData.value)
      if (!error.value) {
        emit('signup')
      }
    }

    return { formData, handleSubmit, error, notification, signup, isPending }
  }
})
</script>

<style scoped></style>
