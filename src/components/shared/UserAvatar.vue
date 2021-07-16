<template>
  <div
    class="user-avatar mr-4"
    :class="`icon-${icon}`">
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: 'pine'
    }
  }
}
</script>

<style lang="scss">
.user-avatar {
  width: 56px;
  height: 56px;
}
</style>
