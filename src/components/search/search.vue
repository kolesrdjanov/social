<template>
  <div class="input-group">
    <input
      class="input-icon input-icon--search"
      @input="debouncedSearch"
      v-model="query"
      placeholder="Search posts and users.."
      type="text">
  </div>
</template>

<script>
import _debounce from "lodash/debounce";

const SEARCH_TIMEOUT = 300

export default {
  data() {
    return {
      query: ''
    }
  },

  methods: {
    debouncedSearch: _debounce(search, SEARCH_TIMEOUT),
  }
}

function search() {
  const request = {
    q: encodeURIComponent(this.query)
  }

  this.$emit('input', request)
}
</script>

<style lang="scss" scoped>
.input-group {
  min-height: 60px;
  background-color: white !important;
  box-shadow: $shadow;
}
</style>