<template>
  <section class="bg-auth flex flex-row items-end h-full">
    <article class="h-full lg:w-6/12 md:w-8/12 w-full pb-10">
      <div class="h-full flex flex-col items-end md:justify-end justify-center md:pr-20 pr-4 pl-4">
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
            <a class="fw-700 underline" @click="$router.push('/register')">Register here</a>
          </div>
        </div>
      </div>
    </article>
    <article class="pl-20 pb-10">
      <label class="color-light block mb-3 uppercase fw-500">Hello you!</label>
      <h3 class="color-light text-3xl fw-700">
        Share what is<br>
        happening and keep<br>
        up with your friends.
      </h3>
    </article>
  </section>
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

<style lang="scss">
@import '@/styles/views/auth';
</style>