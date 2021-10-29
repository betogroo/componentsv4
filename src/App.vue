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
<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
