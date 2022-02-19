<template>
  <div
    class="user-avatar mr-4"
    :class="[`icon-${icon}`, size]">
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: 'pine'
    },

    size: {
      type: String,
      default: () => 'medium'
    }
  }
}
</script>

<style lang="scss">
.user-avatar {

  &.medium {
    width: 64px;
    height: 64px;
  }
  
  &.small {
    width: 36px;
    height: 36px;
  }
}
</style>
