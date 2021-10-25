<template>
  <div class="home">
    <h2>User List</h2>
    <AppBtn @click="handleClick('uid')">Sort by UID</AppBtn>
    <AppBtn @click="handleClick('displayName')">Sort by Display Name</AppBtn>
    <AppBtn @click="handleClick('email')">Sort by Display Email</AppBtn>
    <AppBtn @click="handleClick('role')">Sort by Display Role</AppBtn>
    <UserList :users="users" :order="order" />
    <hr />
    <h1>Job List</h1>
    <JobList v-for="job in jobs" :key="job.uid" :job="job" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import UserList from '@/modules/core/home/components/UserList.vue'
import JobList from '@/modules/core/home/components/JobList.vue'
import AppBtn from '@/components/app/AppBtn.vue'
import User from '../types/User'
import Job from '../types/Job'
import OrderTerm from '@/modules/core/home/types/OrderTerm'

export default defineComponent({
  name: 'Home',

  components: {
    UserList,
    JobList,
    AppBtn
  },

  setup() {
    const users = ref<User[]>([
      {
        displayName: 'Beto',
        email: 'beto@test.com',
        role: 'admin',
        uid: 'abcdef123456'
      },
      {
        displayName: 'Viane',
        email: 'viane@test.com',
        role: 'admin',
        uid: 'abcdef123457',
        photoURL: 'https://foto'
      },
      {
        displayName: 'Teolides',
        email: 'viane@test.com',
        role: 'editor',
        uid: 'abcdef123458'
      }
    ])

    const order = ref<OrderTerm>('uid')

    const jobs = ref<Job[]>([
      { uid: '1', title: 'Front End', salary: 2500, bonus: '100' },
      { uid: '2', title: 'Dev Ops', salary: 3500 },
      { uid: '3', title: 'Backend', salary: 3000, bonus: '100' }
    ])

    const handleClick = (term: OrderTerm): void => {
      order.value = term
    }

    return { users, jobs, handleClick, order }
  }
})
</script>
