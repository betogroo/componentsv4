<template>
  <div>
    <h1>Forms</h1>
    <LoginForm @login="gotoPage('Profile')" v-if="mode === 'login'" />
    <SignupForm @signup="gotoPage('Profile')" v-if="mode === 'signup'" />
    <ResetPasswordForm @reset="gotoPage('Welcome')" v-if="mode === 'reset'" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useRouter } from 'vue-router'
import { LoginForm, SignupForm, ResetPasswordForm } from '../components/'

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
    const router = useRouter()
    const gotoPage = (name: string) => {
      router.push({ name })
    }
    return { gotoPage }
  }
})
</script>

<style scoped></style>
