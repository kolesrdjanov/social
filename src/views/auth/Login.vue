<template>
  <div class="auth-form h-full flex flex-col justify-center">
    <h2 class="color-dark fw-700 text-4xl mb-4 mt-auto">Login</h2>
    <p class="color-medium mb-8">
      Please enter your username and password so<br>
      you can access to your profile
    </p>

    <div class="auth-form--input-group mb-6">
      <label class="fw-700 mb-2">Username</label>
      <input
        type="text"
        placeholder="Username"
        v-model="user.username"
        @input="error = ''"
        @keyup.enter="submit()">
    </div>

    <div class="auth-form--input-group">
      <label class="fw-700 mb-2">Password</label>
      <input
        type="password"
        placeholder="Password"
        v-model="user.password"
        @input="error = ''"
        @keyup.enter="submit()">
    </div>

    <form-message
      class="mt-4"
      v-if="registered"
      :type="'success'"
      :text="'Registration successfull! You may log in now.'">
    </form-message>

    <form-message
      class="mt-4"
      v-if="error.length"
      :type="'error'"
      :text="error">
    </form-message>

    <button
      @click="submit()"
      class="btn-primary mt-10">
        Login
    </button>

    <div class="auth-form--footer mt-auto">
      <label class="block mb-1">You don't have an account?</label>
      <a class="fw-700 underline cursor-pointer" @click="$router.push('/register')">Register here</a>
    </div>
  </div>
</template>

<script>
import { AuthService } from '@/api/authApi'
import { createNamespacedHelpers } from 'vuex'
const { mapMutations: userMutations } = createNamespacedHelpers('user')

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
      'setUser',
      'setToken'
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

    try {
      const { data } = await AuthService.signIn(this.user)
      
      if (data) {
        this.setUser(data.info)
        this.setToken(data.token)
        this.$router.push({ name: 'home' })
      }
    } catch (error) {
      this.error = error.response.data.error
    }
    
  }
}
</script>