<script setup lang="ts">
// script setup template
// compile but not lint

import { defineProps, withDefaults } from 'vue'

interface Props {
  type?: string
  text?: string
  isActive?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'primary',
  text: '',
  isActive: false
})

console.log(props)
</script>

<template>
  <div v-if="isActive" :class="type">{{ text }}</div>
</template>
<style lang="scss" scoped>
.error {
  color: red;
}
.success {
  color: green;
}
</style>
