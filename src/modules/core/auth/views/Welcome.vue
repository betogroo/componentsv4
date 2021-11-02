<template>
  <div>
    <h1>Forms</h1>
    <LoginForm v-if="mode === 'login'" />
    <SignupForm v-if="mode === 'signup'" />
    <ResetPasswordForm v-if="mode === 'reset'" />
    <div>
      <h1>Carregando2...</h1>
      <h5>Deu pau</h5>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import LoginForm from '../components/LoginForm.vue'
import SignupForm from '../components/SignupForm.vue'
import ResetPasswordForm from '../components/ResetPasswordForm.vue'

export default defineComponent({
  name: 'Welcome',

  props: {
    mode: {
      type: String as PropType<string>,
      default: 'login'
    }
  },

  components: {
    LoginForm,
    SignupForm,
    ResetPasswordForm
  },

  setup() {
    return {}
  }
})
</script>

<style scoped></style>
