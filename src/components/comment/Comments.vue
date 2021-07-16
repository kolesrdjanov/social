<template>
  <div>
    <ul>
      <li
        v-for="comment in data"
        :key="comment.id"
        class="py-3">
          <div>
            <div class="flex">
              <div class="flex-grow">
                <div class="mb-1">
                  <label class="mr-2">@{{ comment.user.displayName }}</label>
                  <small class="ml-auto">{{ $moment(comment.createdAt).fromNow() }}</small>
                </div>
                <label v-if="!comment.edit">{{ comment.content }}</label>
                <div v-else class="flex flex-col mb-6">
                  <textarea
                    v-if="commentForEdit"
                    :ref="`comment_input_${comment.id}`"
                    rows="5"
                    v-model="commentForEdit.content"
                    type="text"
                    class="mb-2">
                  </textarea>
                  <div>
                    <button class="mr-3" @click="updateComment()">Update</button>
                    <button @click="hideEditComment(comment)">Cancel</button>
                  </div>
                </div>
              </div>
              
            </div>
            <div>
              <small
                v-if="comment.user.id === user.id"
                @click="showEditComment(comment)"
                class="underline cursor-pointer mt-2 mr-2">
                  Edit
              </small>
              <small
                v-if="comment.user.id === user.id || post.user.id === user.id"
                @click="removeComment(comment.id)"
                class="underline cursor-pointer mt-2">
                  Remove
              </small>
            </div>
          </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Vue from 'vue'
import { createNamespacedHelpers } from "vuex"
import { CommentService } from '@/api/commentApi'

const { mapGetters: userGetters } = createNamespacedHelpers("user")

export default {
  props: {
    data: {
      type: Array
    },
    post: {
      type: Object
    }
  },

  data() {
    return {
      commentForEdit: null,
    }
  },

  computed: {
    ...userGetters([
      'user'
    ])
  },

  methods: {
    showEditComment,
    hideEditComment,
    updateComment,
    removeComment,
    reloadComments
  }
}

function showEditComment(comment) {
  this.commentForEdit = {...comment}
  Vue.set(comment, 'edit', true)
  this.$nextTick(() => {
    this.$refs[`comment_input_${comment.id}`][0].focus()
  })
}

function hideEditComment(comment) {
  this.commentForEdit = null
  Vue.set(comment, 'edit', false)
}

async function updateComment() {
  if (!this.commentForEdit.content.length) {
    return
  }

  try {
    const request = {
      id: this.commentForEdit.id,
      data: this.commentForEdit
    }

    await CommentService.update(request)
    this.reloadComments()
  } catch (error) {
    console.log(error)
  }
}

async function removeComment(id) {
  try {
    await CommentService.remove(id)
    this.reloadComments()
  } catch (error) {
    console.log(error)
  }
}

function reloadComments() {
  this.$emit('reloadComments')
}
</script>
