<template>
  <div>
    <input
      placeholder="firstname"
      type="text"
      v-model="user.firstname">

    <input
      placeholder="lastname"
      type="text"
      v-model="user.lastname">

    <input
      placeholder="display name"
      type="text"
      v-model="user.displayName">

    <input
      placeholder="username"
      type="text"
      v-model="user.username">

    <input
      placeholder="password"
      type="password"
      v-model="user.password">

    <button @click="validate()">Submit</button>

    <div v-if="error.length">{{ error }}</div>
  </div>
</template>

<script>
import { AuthService } from '@/api/authApi'
import { UserService } from '@/api/userApi'

export default {
   data() {
     return {
       error: "",
       user: {
         firstname: '',
         lastname: '',
         displayName: '',
         username: '',
         password: ''
       }
     }
   },

   methods: {
     validate,
     checkUsername,
     submit
   }
}

async function validate() {
  this.error = ""
  // validate form

  if (await this.checkUsername()) {
    // user exists
    this.error = "Username is taken. Please use something else."
  } else {
    this.submit()
  }
}

async function checkUsername() {
  const { data } = await UserService.getUserByUsername({
    username: this.user.username
  })
  return data.length
}

async function submit() {
  const { data } = await AuthService.register(this.user)
  if (data) {
    this.$router.push({ name: 'signIn' })
  }
}
</script>