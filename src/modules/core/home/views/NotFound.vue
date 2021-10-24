<template>
  <h1>404</h1>
  <button @click.prevent="backPage">Voltar</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'Notfound',

  setup() {
    const router = useRouter()
    const backPage = () => {
      router.go(-1)
    }

    return { backPage }
  }
})
</script>

<style scoped></style>
