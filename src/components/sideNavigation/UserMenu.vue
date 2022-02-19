<template>
  <div class="relative">
    <label>@{{ display }}</label>
    <ul>
      <li>
        <router-link :to="{ name: 'profile' }">My profile</router-link>
      </li>
      <li>
        <div @click="signOut()">Sign out</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    display: {
      type: String
    }
  },

  methods: {
    signOut
  }
}

function signOut() {
  this.$emit('signOut');
}
</script>