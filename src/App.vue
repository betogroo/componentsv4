<template>
  <div id="app">
    <NavBar />
  </div>

  <router-view />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import NavBar from '@/components/layout/nav/NavBar.vue'

export default defineComponent({
  name: 'App',

  components: {
    NavBar
  }
})
</script>
