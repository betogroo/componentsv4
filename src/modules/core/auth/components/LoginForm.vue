<template>
  <div class="form">
    <form @submit.prevent="handleSubmit">
      <input type="email" v-model="formData.email" />
      <input type="password" v-model="formData.password" />
      <AppBtn>Entrar</AppBtn>
      <hr />
      <AppBtn @click="handleClick" type="button">Entrar com o Google</AppBtn>
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
import { defineComponent, ref } from 'vue'
import useLogin from '../composables/useLogin'
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
  setup(props, { emit }) {
    const { error, notification, isPending, login, loginWithGoogle } =
      useLogin()
    const formData = ref<Auth>({
      email: 'betogroo@beto.com',
      password: '123456'
    })
    const handleSubmit = async (): Promise<void> => {
      await login(formData.value)
      if (!error.value) {
        emit('login')
      }
    }

    const handleClick = async () => {
      await loginWithGoogle()
      if (!error.value) {
        emit('login')
      }
    }
    return {
      formData,
      handleSubmit,
      handleClick,
      error,
      notification,
      isPending
    }
  }
})
</script>

<style lang="scss" scoped>
.form {
}
form {
  margin-right: auto;
  margin-left: auto;
  max-width: 360px;
  display: flex;
  flex-direction: column;
}
</style>
