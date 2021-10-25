<template>
  <h4>Order by {{ order }}</h4>
  <ul>
    <li v-for="user in orderedUsers" :key="user.uid">
      {{
        `${user.uid} - ${user.displayName} - ${user.email} - ${
          user.photoURL || ''
        }`
      }}
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import User from '@/modules/core/home/types/User'
import OrderTerm from '@/modules/core/home/types/OrderTerm'
export default defineComponent({
  name: 'UserList',

  props: {
    users: {
      type: Array as PropType<User[]>,
      required: true
    },
    order: {
      type: String as PropType<OrderTerm>,
      required: true
    }
  },
  setup(props) {
    const orderedUsers = computed(() => {
      return [...props.users].sort((a: User, b: User) => {
        return a[props.order] > b[props.order] ? 1 : -1
      })
    })
    return { orderedUsers }
  }
})
</script>

<style></style>
