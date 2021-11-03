<template>
  <div class="load">
    <div v-for="i in 4" :key="i"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DefaultLoading'
})
</script>

<style lang="scss" scoped>
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
  width: 8px;
  height: 8px;
  border: 1px solid black;
  border-radius: 50%;
  background: white;
  animation: load 1.5s cubic-bezier(0, 0.5, 0.5, 1) infinite;
}
$pos: 4;
$delay: 0;
$step: 12;
@for $i from 1 through 4 {
  .load div:nth-child(#{$i}) {
    left: #{$pos}px;
    animation-delay: #{$delay/100 * -1}s;
  }
  $pos: $pos + $step;
  $delay: $delay - $step;
}
/* .load div:nth-child(1) {
  left: 4px;
  animation-delay: -0.36s;
}
.load div:nth-child(2) {
  left: 16px;
  animation-delay: -0.24s;
}
.load div:nth-child(3) {
  left: 28px;
  animation-delay: -0.12s;
}
.load div:nth-child(4) {
  left: 40px;
  animation-delay: 0;
} */
@keyframes load {
  0% {
    background: red;
  }

  50%,
  100% {
    background: white;
  }
}
</style>
