<template>
  <div>User List</div>
  <ul>
    <li v-for="user in users" :key="user.uid">
      {{
        `${user.uid} - ${user.displayName} - ${user.email} - ${
          user.photoURL || ''
        }`
      }}
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import User from '@/modules/core/home/types/User'
export default defineComponent({
  name: 'UserList',

  props: {
    users: {
      type: Array as PropType<User[]>,
      required: true
    }
  },
  setup() {
    return {}
  }
})
</script>

<style></style>
