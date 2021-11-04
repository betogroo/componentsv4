<template>
  <div class="load">
    <div v-for="i in 3" :key="i"></div>
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
  // border: 1px dashed black;
  border-radius: 10%;
  background: white;
  animation: load 1s cubic-bezier(0, 0.5, 0.5, 1) infinite;
}
$pos: 0;
$delay: 0;
$step: 18;
@for $i from 1 through 3 {
  $p: $i % 2;

  .load div:nth-child(#{$i}) {
    left: #{$pos}px;
    animation-delay: #{$delay/100 * -1}s;
  }
  $pos: $pos + $step;
  $delay: $delay - $step;
}

@keyframes load {
  0% {
    background: darkred;
    //border-style: double;
  }

  50% {
    background: white;
    width: 50%;
    height: 50%;
    //border: 2px dashed black;
  }
  100% {
    background: darkred;
    //border-style: double;
  }
}
</style>
