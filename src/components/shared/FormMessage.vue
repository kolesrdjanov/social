<template>
  <div
    class="form-message rounded fw-500"
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
  font-size: 12px;
  font-weight: 400;

  &.form-message--success {
    color: $color-success;
  }

  &.form-message--error {
    color: $color-error;
  }
}
</style>