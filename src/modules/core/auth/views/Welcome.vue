<template>
  <div>
    <h1>Forms</h1>
    <LoginForm v-if="mode === 'login'" />
    <hr />
    <SignupForm v-if="mode === 'signup'" />
    <hr />
    <ResetPasswordForm v-if="mode === 'reset'" />
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
