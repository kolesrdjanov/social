<template>
  <div class="main-content pt-10 pl-4 pr-4 flex items-start">
    <side-navigation></side-navigation>
    <div>
      <router-view/>
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