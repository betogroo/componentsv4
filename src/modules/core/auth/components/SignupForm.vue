<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <input v-model="formData.displayName" type="text" />
      <input v-model="formData.email" type="email" />
      <input v-model="formData.password" type="password" />
      <input v-model="formData.passwordConfirm" type="password" />
      <button type="submit">Cadastrar</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Auth from '../types/Auth'

export default defineComponent({
  name: 'SignupForm',

  setup() {
    const formData = ref<Auth>({
      email: '',
      password: '',
      passwordConfirm: '',
      displayName: ''
    })

    const handleSubmit = () => {
      console.log(formData.value)
    }

    return { formData, handleSubmit }
  }
})
</script>

<style scoped></style>
