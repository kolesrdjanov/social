<template>
  <div class="flex flex-col">
    <input
      class="w-full"
      placeholder="Mic'drop them"
      v-model="comment"
      @keyup.enter="submit()"
      type="text">
    <button
      @click="submit()"
      class="ml-auto mt-2">
        Post comment
    </button>
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

    await CommentService.create(request)
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
