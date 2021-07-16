<template>
  <div class="flex flex-col items-center justify-center h-full">
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
        @input="debouncedCheckUsername"
        placeholder="username"
        type="text"
        v-model="user.username">
      <form-message
        v-if="error.length"
        :type="error"
        :text="error">
      </form-message>

      <input
        placeholder="password"
        type="password"
        v-model="user.password">

      <button @click="validate()">Submit</button>
      <a @click="$router.push('/sign-in')">Back to Sign In</a>
    </div>
  </div>
</template>

<script>
import { AuthService } from '@/api/authApi'
import { UserService } from '@/api/userApi'
import _debounce from "lodash/debounce";

const icons = [
  'peach',
  'lemon',
  'pine',
  'cherry'
]

const SEARCH_TIMEOUT = 300

export default {
   data() {
     return {
       error: '',
       user: {
         firstname: '',
         lastname: '',
         displayName: '',
         username: '',
         password: '',
         icon: icons[Math.floor(Math.random() * icons.length)]
       }
     }
   },

   methods: {
     validate,
     debouncedCheckUsername: _debounce(checkUsername, SEARCH_TIMEOUT),
     submit
   }
}

async function validate() {
  if (this.error.length) {
    return
  }
  // validate form

  this.submit()
}

async function checkUsername() {
  this.error = ''

  if (this.user.username.length) {
    const { data } = await UserService.getUserByUsername({
      username: this.user.username
    })

    if (data.length) {
      // user exist
      this.error = "Username is taken. Please use something else."
    }
  } 
}

async function submit() {
  const { data } = await AuthService.register(this.user)
  if (data) {
    this.$router.push({
      name: 'signIn',
      query: {
        register: 'success'
      }
    })
  }
}
</script>