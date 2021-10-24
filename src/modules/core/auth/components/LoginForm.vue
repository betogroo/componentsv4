<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <input type="email" v-model="formData.email" />
      <input type="password" v-model="formData.password" />
      <button type="submit">Entrar</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Auth from '../types/Auth'

export default defineComponent({
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
