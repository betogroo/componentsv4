<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <input v-model="formData.email" type="email" />
      <button type="submit">Redefinir</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Auth from '../types/Auth'

export default defineComponent({
  name: 'ResetPasswordForm',

  setup() {
    const formData = ref<Auth>({
      email: ''
    })

    const handleSubmit = () => {
      console.log(formData.value)
    }

    return { formData, handleSubmit }
  }
})
</script>

<style scoped></style>
