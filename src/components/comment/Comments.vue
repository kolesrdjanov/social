<template>
  <div>
    <ul>
      <li
        v-for="comment in data"
        :key="comment.id">
          <label>{{ comment.content }}</label>
          <small>{{ comment.createdAt | moment('DD MMM YYYY h:mm A') }}</small>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array
    }
  }
}
</script>
