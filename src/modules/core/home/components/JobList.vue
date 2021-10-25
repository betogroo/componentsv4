<template>
  <h2>{{ `${job.title} - ${job.salary} ${job.bonus}` }}</h2>
  <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed odit aliquam
    libero, soluta unde eum ex blanditiis! Est officia optio repellat itaque
    quisquam exercitationem asperiores facilis, et similique excepturi dolores!
  </p>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Job from '@/modules/core/home/types/Job'
export default defineComponent({
  name: 'UserList',

  props: {
    job: {
      type: Object as PropType<Job>,
      required: true
    }
  },
  setup() {
    return {}
  }
})
</script>

<style></style>
