<template>
  <div>
    {{ error }}
    <form @submit.prevent="handleSubmit">
      <input v-model="formData.email" type="email" />
      <AppBtn type="submit">Redefinir</AppBtn>
      <AuthFormLink
        text="Ainda não em cadastro?"
        textLink="Cadastre-se"
        :to="{ name: 'Welcome', params: { mode: 'signup' } }"
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
import userResetPassword from '../composables/useResetPassword'
import DefaultNotification from '@/components/layout/notification/DefaultNotification.vue'
import DefaultLoading from '@/components/layout/loading/DefaultLoading.vue'
import AuthFormLink from './AuthFormLink.vue'
import { Auth } from '../types/Auth'

export default defineComponent({
  name: 'ResetPasswordForm',

  components: {
    AuthFormLink,
    DefaultNotification,
    DefaultLoading
  },

  setup(props, { emit }) {
    const { error, notification, isPending, reset } = userResetPassword()
    const formData = ref<Auth>({
      email: 'beto@beto.com',
      password: ''
    })

    const handleSubmit = async () => {
      await reset(formData.value)
      if (!error.value) {
        emit('reset')
      }
    }

    return { formData, handleSubmit, error, notification, isPending }
  }
})
</script>

<style scoped></style>
