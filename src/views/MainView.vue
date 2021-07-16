<template>
  <div class="main-content">
    <top-navigation></top-navigation>
    <div class="container pt-10">
      <router-view/>
    </div>
  </div>
</template>

<script>
import TopNavigation from '@/components/topNavigation/TopNavigation.vue'
export default {
  components: {
    TopNavigation
  }
}
</script>