<template>
  <div class="load">
    <div v-for="i in 6" :key="i"></div>
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
  display: flex;
  justify-items: center;
  align-items: center;
  position: absolute;
  width: 84px;
  height: 28px;
}
.load div {
  display: inline-block;
  position: absolute;
  left: 8px;
  width: 24px;
  height: 24px;
  border: 1px dashed black;
  border-radius: 50%;
  background: white;
  animation: load 1.5s cubic-bezier(0, 0.5, 0.5, 1) infinite;
}
$pos: 0;
$delay: 0;
$step: 12;
@for $i from 1 through 6 {
  .load div:nth-child(#{$i}) {
    left: #{$pos}px;
    animation-delay: #{$delay/100 * -1}s;
  }
  $pos: $pos + $step;
  $delay: $delay - $step;
}

@keyframes load {
  0% {
    top: 8px;
    background: red;
  }

  50% {
    bottom: 8px;
    background: darkred;
  }
  100% {
    top: 0px;
    background: white;
  }
}
</style>
