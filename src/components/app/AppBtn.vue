<template>
  <button v-bind="$attrs">
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'AppBtn'
})
</script>
<style lang="scss" scoped></style>
