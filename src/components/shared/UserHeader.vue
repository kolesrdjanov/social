<template>
  <div class="flex flex-row items-center" v-if="user">
    <user-avatar
      :icon="user.icon">
    </user-avatar>
    <router-link
      :to="{ name: 'profile', params: { userId: user.id }}">
      <span class="fw-700 mr-2 color-dark">{{ `${user.firstname} ${user.lastname}` }}</span>
    </router-link>
    <span class="fw-500 color-medium">@{{ user.displayName }}</span>
    <span v-if="timestamp" class="fw-500 color-medium ml-auto fs-12 flex-shrink text-right">{{ $moment(timestamp).fromNow() }}</span>
    <span v-if="date" class="fw-500 color-medium ml-auto fs-12 flex-shrink text-right">{{ date | moment('DD MMM YYYY') }}</span>
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
    },
    date: {
      type: Number
    }
  }
}
</script>

<style lang="scss">

</style>