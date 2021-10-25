<template>
  <div class="home"></div>
  <UserList :users="users" />
  <hr />
  <h1>Job List</h1>
  <JobList v-for="job in jobs" :key="job.uid" :job="job" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import UserList from '@/modules/core/home/components/UserList.vue'
import JobList from '@/modules/core/home/components/JobList.vue'
import User from '../types/User'
import Job from '../types/Job'

export default defineComponent({
  name: 'Home',

  components: {
    UserList,
    JobList
  },

  setup() {
    const users = ref<User[]>([
      { displayName: 'Beto', email: 'beto@test.com', uid: 'abcdef123456' },
      {
        displayName: 'Viane',
        email: 'viane@test.com',
        uid: 'abcdef123457',
        photoURL: 'https://foto'
      },
      { displayName: 'Teolides', email: 'viane@test.com', uid: 'abcdef123458' }
    ])

    const jobs = ref<Job[]>([
      { uid: '1', title: 'Front End', salary: 2500, bonus: '100' },
      { uid: '2', title: 'Dev Ops', salary: 3500 },
      { uid: '3', title: 'Backend', salary: 3000, bonus: '100' }
    ])

    return { users, jobs }
  }
})
</script>
