<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>{{ name }} - {{ age }}</h2>
    <p>ID - TITLE - SALARY</p>
    <p v-for="job in jobs" :key="job.id">
      {{ `${job.id} - ${job.title} - ${job.salary}` }}
    </p>
    <button @click="handleClick('Luiz')">Change Name</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Job from '../types/Jobs'

export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: String
  },

  setup(props) {
    const name = ref('Beto')
    const age = ref<number | string>(25)
    const jobs = ref<Job[]>([
      { title: 'Front End', salary: 10000, id: 'dusyuisdsid' },
      { title: 'DevOps', salary: 15000, id: 'dsauisgdsid' },
      { title: 'Data Science', salary: 100000, id: 'dusggfsdsid' }
    ])

    name.value = props.msg + name.value
    age.value = 25

    const handleClick = (data: string) => {
      name.value = data
      return true
    }

    return { name, age, handleClick, jobs }
  }
})
</script>
