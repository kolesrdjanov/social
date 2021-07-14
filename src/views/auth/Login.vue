<template>
  <div>
    <input
      type="text"
      v-model="user.username">
    <input
      type="password"
      v-model="user.password">
    <button @click="user.username && user.password && submit()">Login</button>

    <div v-if="error.length">{{ error }}</div>
  </div>
</template>

<script>
import { AuthService } from "@/api/authApi"
import { createNamespacedHelpers } from "vuex"
const { mapMutations: userMutations } = createNamespacedHelpers("user")

export default {
  data() {
    return {
      user: {
        username: '',
        password: ''
      },
      error: ''
    }
  },

  methods: {
    submit,
    ...userMutations([
      'setUser'
    ])
  }
}

async function submit() {
  this.error = '';
  const { data } = await AuthService.signIn(this.user)
  
  if (data && data.length) {
    this.setUser(data[0])
    this.$router.push({ name: 'home' })
  } else {
    this.error = 'Invalid credentials'
  }
}
</script>