<template>
  <aside
     v-if="user"
    class="p-4 xl:p-14 mb-6 xl:mb-0 sm:mr-0 xl:mr-10 flex flex-row xl:flex-col justify-between xl:justify-start w-full xl:w-auto"
    id="aside">

    <router-link
      :to="{ name: 'home' }"
      class="sm:mb-0 xl:mb-8 block router-link flex items-center">
        <div class="sidebar-icon icon-home"></div>
    </router-link>

    <router-link
      :to="{ name: 'profile', params: { userId: user.id} }"
      class="sm:mb-0 xl:mb-8 block router-link flex items-center">
        <div class="sidebar-icon icon-user"></div>
    </router-link>

    <a class="router-link block flex items-center cursor-pointer" @click="signOutAndRedirect()">
      <div class="sidebar-icon icon-logout"></div>
    </a>
  </aside>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const {
  mapGetters: userGetters,
  mapActions: userActions } = createNamespacedHelpers('user')

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
aside {
  border-radius: $size-base-border-radius;
  background-color: $color-accent;
  position: sticky;
  position: -webkit-sticky;
  top: 40px;
  z-index: 1100;
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
