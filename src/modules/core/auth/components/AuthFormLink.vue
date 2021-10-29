<template>
  <p>
    {{ text }}
    <router-link :to="to">{{ textLink }}</router-link>
  </p>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'AuthFormLink',

  props: {
    text: {
      type: String,
      default: ''
    },
    textLink: {
      type: String,
      required: true
    },
    to: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped>
a {
  text-decoration: none;
  color: darkblue;
}
a:hover {
  color: red;
  text-decoration: none;
}
</style>
