<template>
  <div class="load">
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DefaultLoading'
})
</script>

<style scoped>
.load {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.load div {
  display: inline-block;
  position: absolute;
  left: 8px;
  width: 16px;
  background: red;
  animation: load 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
}
.load div:nth-child(1) {
  left: 8px;
  animation-delay: -0.24s;
}
.load div:nth-child(2) {
  left: 32px;
  animation-delay: -0.12s;
}
.load div:nth-child(3) {
  left: 56px;
  animation-delay: 0;
}
@keyframes load {
  0% {
    top: 8px;
    height: 64px;
  }
  50%,
  100% {
    top: 24px;
    height: 32px;
  }
}
</style>
