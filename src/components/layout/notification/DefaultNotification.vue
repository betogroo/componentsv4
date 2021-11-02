<template>
  <div v-if="isActive" :class="type">{{ text }}</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'DefaultNotification',

  props: {
    type: {
      type: String as PropType<string>,
      default: 'primary'
    },
    text: {
      type: String as PropType<string>,
      default: ''
    },
    isActive: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },

  setup() {
    return {}
  }
})
</script>

<style scoped>
.error {
  color: red;
}
.success {
  color: green;
}
</style>
