<template>
  <div>
    <top-navigation></top-navigation>
    <div class="container">
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