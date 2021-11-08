<template>
  <div v-if="user">
    <h1>Página de {{ `${user.displayName} (${user.email})` }}</h1>
    <h2>{{ user.uid }}</h2>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import getUser from '@/modules/core/auth/composables/getUser'

export default defineComponent({
  name: 'Profile',

  setup() {
    const { user } = getUser()

    return { user }
  }
})
</script>

<style scoped></style>
