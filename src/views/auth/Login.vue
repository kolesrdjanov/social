<template>
  <div class="flex flex-col items-center justify-center h-full">
    <div>
      <input
        type="text"
        v-model="user.username"
        @input="error = ''"
        @keyup.enter="submit()">

      <input
        type="password"
        v-model="user.password"
        @input="error = ''"
        @keyup.enter="submit()">

      <form-message
        v-if="registered"
        :type="'success'"
        :text="'Registration successfull! You may log in now.'">
      </form-message>

      <form-message
        v-if="error.length"
        :type="'error'"
        :text="error">
      </form-message>

      <button @click="submit()">Login</button>
      <a @click="$router.push('/register')">Register</a>
    </div>
  </div>
</template>

<script>
import { AuthService } from "@/api/authApi"
import { createNamespacedHelpers } from "vuex"
const { mapMutations: userMutations } = createNamespacedHelpers("user")

export default {
  data() {
    return {
      registered: false,
      user: {
        username: '',
        password: ''
      },
      error: ''
    }
  },

  methods: {
    submit,
    showRegisterSuccess,
    ...userMutations([
      'setUser'
    ])
  },

  mounted() {
    if (this.$route.query.register) {
      this.showRegisterSuccess()
    }
  }
}

function showRegisterSuccess() {
  this.registered = true
  setTimeout(() => {
    this.registered = false
  }, 5000)
}

async function submit() {
  if (this.user.username.length && this.user.password.length) {
    this.error = '';
    const { data } = await AuthService.signIn(this.user)
    
    if (data && data.length) {
      this.setUser(data[0])
      this.$router.push({ name: 'home' })
    } else {
      this.error = 'Invalid credentials.'
    }
  }
}
</script>