<template>
  <div class="main-content pt-4 xl:pt-10 pl-4 pr-4 items-start flex flex-col xl:flex-row">
    <side-navigation></side-navigation>
    <div class="flex-grow w-full">
      <transition name="fade" mode="out-in">
        <router-view/>
      </transition>
    </div>
  </div>
</template>

<script>
import SideNavigation from '@/components/sideNavigation/SideNavigation.vue'
export default {
  components: {
    SideNavigation
  }
}
</script>

<style lang="scss">
.main-content {
  min-height: 100%;
  max-width: 1200px;
  margin: 0 auto;
}
</style>