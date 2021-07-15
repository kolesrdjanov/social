<template>
  <header
    id="header">
    <nav class="container py-3">
      <user-menu
        v-if="user"
        :display-name="user.displayName"
        @signOut="signOutAndRedirect">
      </user-menu>
    </nav>
  </header>
</template>

<script>
import { createNamespacedHelpers } from "vuex"
import UserMenu from './UserMenu.vue'

const {
  mapGetters: userGetters,
  mapActions: userActions } = createNamespacedHelpers("user")

export default {
  components: {
    UserMenu
  },

  computed: {
    ...userGetters([
      'user'
    ])
  },

  methods: {
    signOutAndRedirect,
    ...userActions([
      'signOut'
    ])
  }
}

async function signOutAndRedirect() {
  await this.signOut();
  this.$router.push({ name: 'signIn' })
}
</script>

<style lang="scss" scoped>
header#header {
  background-color: #f2f2f2;
}
</style>
