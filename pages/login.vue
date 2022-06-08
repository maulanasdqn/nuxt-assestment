<template>
  <div
    class="flex flex-col justify-center items-center h-screen w-full gap-y-6"
  >
    <h1 class="text-blue-600 font-bold text-2xl">Login</h1>
    <div
      class="flex flex-col bg-gray-100 border-2 border-blue-400 h-1/2 w-1/2 rounded-lg items-center justify-center px-32"
    >
      <Alert v-if="alert" :data-alert="alert" />
      <TextField
        v-model="email"
        label="Email"
        rules="required|email"
        placeholder="msdqn@outlook.com"
        prepend
        prepend-icon="user"
      />
      <TextField
        v-model="password"
        label="Password"
        rules="required|password"
        placeholder="Masukkan Password"
        prepend
        prepend-icon="user"
        type="password"
      />
      <DvxButton text="Login" type="submit" @click="login()" />
    </div>
  </div>
</template>
<script>
export default {
  auth: 'guest',
  data() {
    return {
      email: '',
      password: '',
      alert: null,
    }
  },
  methods: {
    showAlert(d, type) {
      if (d && type) {
        this.alert = {
          title: d.title,
          message: d.message,
          type,
        }
      }
    },
    async login() {
      console.log('login')
      try {
        await this.$auth.loginWith('local', {
          data: {
            email: this.email.trim(),
            password: this.password,
          },
        })
        this.$router.push(this.$auth.options.redirect.dashboard)
      } catch (error) {
        console.log(error)
        this.showAlert(
          { message: error + ' \nInvalid Email/Password ' },
          'error'
        )
      }
    },
  },
}
</script>
