<template>
  <div class="flex flex-row items-center" v-if="user">
    <user-avatar
      :icon="user.icon">
    </user-avatar>
    <span class="fw-700 mr-2 color-dark">{{ `${user.firstname} ${user.lastname}` }}</span>
    <span class="fw-500 color-medium">@{{ user.displayName }}</span>
    <span v-if="timestamp" class="fw-500 color-medium ml-auto fs-12">{{ $moment(timestamp).fromNow() }}</span>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object
    },
    timestamp: {
      type: Number,
      default: null
    }
  }
}
</script>

<style lang="scss">

</style>