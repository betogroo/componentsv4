<template>
  <div :class="type">{{ text }}</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { NotificationType } from '@/types/Notification'

export default defineComponent({
  name: 'DefaultNotification',

  props: {
    type: {
      type: String as PropType<NotificationType>,
      default: ''
    },
    text: {
      type: String as PropType<string>,
      default: ''
    }
  }
})
</script>

<style lang="scss" scoped>
.error {
  color: red;
}
.success {
  color: green;
}
</style>
