<template>
  <div class="flex justify-center items-center h-screen w-full">
    <div class="flex flex-col gap-y-4 items-center">
      <h1 class="text-black-900 text-6xl font-bold">Assestmen Davixel</h1>
      <h3 class="text-2xl font-medium text-black-900">Maulana Sodiqin</h3>
      <div class="flex gap-x-6">
        <DvxButton text="Login" />
      </div>
      <TextField
        label="Email"
        rules="required|email"
        placeholder="msdqn@outlook.com"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'IndexPage',
  auth: 'guest',
  computed: {
    ...mapGetters('user', ['getTest']),
  },
}
</script>
