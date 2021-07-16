<template>
  <aside
     v-if="user"
    class="p-14 mr-10"
    id="aside">

    <router-link
      :to="{ name: 'home' }"
      class="mb-8 block router-link flex items-center">
        <div class="sidebar-icon icon-home"></div>
    </router-link>

    <router-link
      :to="{ name: 'profile', params: { userId: user.id} }"
      class="mb-8 block router-link flex items-center">
        <div class="sidebar-icon icon-user"></div>
    </router-link>

    <a class="router-link block flex items-center cursor-pointer" @click="signOutAndRedirect()">
      <div class="sidebar-icon icon-logout"></div>
    </a>
  </aside>
</template>

<script>
import { createNamespacedHelpers } from "vuex"

const {
  mapGetters: userGetters,
  mapActions: userActions } = createNamespacedHelpers("user")

export default {
  computed: {
    ...userGetters([
      'user'
    ]),

    sidebar: function () {
      const HOME_ROUTE = 0
      return this.$router.options.routes[HOME_ROUTE].children
    }
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
aside#aside {
  border-radius: $size-base-border-radius;
  background-color: $color-accent;
}

.router-link {
  width: 60px;
  height: 60px;
  border-radius: $size-base-border-radius / 2;
  background-color: transparent;
  
  &.router-link-active {
    background-color: $color-primary;
  }
}

.sidebar-icon {
  transition: 0.2s ease all;
  width: 24px;
  height: 24px;
  margin: 0 auto;
}
</style>
