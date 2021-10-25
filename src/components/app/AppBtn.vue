<template>
  <button :type="type">
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
export default defineComponent({
  name: 'AppBtn',

  props: {
    type: {
      type: String as PropType<string>,
      required: true
    },
    color: {
      type: String,
      required: true
    }
  },
  setup() {
    return {}
  }
})
</script>
