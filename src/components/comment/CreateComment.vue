<template>
  <div class="flex flex-col">
    <div class="input-group">
      <input
        type="text"
        v-model="comment"
        @keyup.enter="submit()"
        name="Post content"
        placeholder="What is on your mind?">
      <button
        @click="submit()"
        :disabled="saving"
        class="btn-primary">
          Comment
      </button>
    </div>
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
      saving: false,
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

  this.saving = true

  try {
    const request = {
      postId: this.postId,
      content: this.comment
    }

    await CommentService.create(request)
    this.comment = ''
    this.reloadComments()
  } catch (error) {
    console.log(error)
  } finally {
    this.saving = false
  }
}


function reloadComments() {
  this.$emit('reloadComments', true)
}
</script>
