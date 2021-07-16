<template>
  <div>
    <input
      @input="debouncedSearch"
      v-model="query"
      placeholder="Search basically anything"
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
    q: this.query
  }

  this.$emit('input', request)
}
</script>