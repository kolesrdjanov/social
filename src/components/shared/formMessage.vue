<template>
  <div
    class="form-message p-3 rounded text-center"
    :class="`form-message--${type}`">
      {{ text }}
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
div.form-message {
  color: white;
  font-size: 12px;
  font-weight: 500;

  &.form-message--success {
    background-color: #52c469;
  }

  &.form-message--error {
    background-color: #c24848;
  }
}
</style>