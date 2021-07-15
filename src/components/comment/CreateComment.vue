<template>
  <div>
    <input
      v-model="comment"
      @keyup.enter="submit()"
      type="text">
    <button @click="submit()">Post</button>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex"
import { CommentService } from '@/api/commentApi'

const { mapGetters: userGetters } = createNamespacedHelpers("user")

export default {
  props: {
    postId: {
      type: Number
    }
  },

  data() {
    return {
      comment: ''
    }
  },

  computed: {
    ...userGetters([
      'user'
    ])
  },

  methods: {
    submit,
    reloadComments
  }
}

async function submit() {
  if (!this.comment.length) {
    return
  }

  try {
    const request = {
      createdAt: Date.now(),
      postId: this.postId,
      content: this.comment,
      user: {
        firstname: this.user.firstname,
        lastname: this.user.lastname,
        id: this.user.id,
        displayName: this.user.displayName
      }
    }

    await CommentService.createComment(request)
    this.comment = ''
    this.reloadComments()
  } catch (error) {
    console.log(error)
  }
}


function reloadComments() {
  this.$emit('reloadComments')
}
</script>
