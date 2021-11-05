<template>
  <div class="nav">
    <div class="menu">
      {{ isPending }}
      {{ notification }}
      <router-link to="/">Home</router-link> |
      <router-link to="/welcome">Welcome</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <div class="profile">
      <h5>usuario</h5>
      <button @click.prevent="logout">Sair</button>
      {{ error }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useLogout from '@/modules/core/auth/composables/useLogout'

export default defineComponent({
  setup() {
    const { error, logout: logoutSystem, isPending, notification } = useLogout()
    const logout = async () => {
      await logoutSystem()
      if (!error.value) {
        console.log('deslogou')
      }
    }
    return {
      logout,
      error,
      isPending,
      notification
    }
  }
})
</script>

<style lang="scss" scoped>
.nav,
.profile {
  padding: 0;
  margin: 0;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.profile button {
  margin: 4px;
  padding: 4px;
  background: none;
  border: none;
  cursor: pointer;
}
.profile button:hover {
  color: red;
}
</style>
