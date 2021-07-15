<template>
  <div>

  </div>
</template>

<script>
export default {
  methods: {
    reloadFeed
  }
}

function reloadFeed() {
  this.$emit('reloadFeed')
}
</script>
