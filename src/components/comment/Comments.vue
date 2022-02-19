<template>
  <div>
    <ul class="mb-10">
      <li
        v-for="comment in data"
        :key="comment.id"
        class="py-4 border-bottom--pale">
          <div>
            <div class="flex">
              <div class="flex-grow">
                <user-header
                  :size="'small'"
                  :user="comment.user"
                  :timestamp="comment.createdAt">
                </user-header>
                <div class="comment-inner">
                  <label v-if="!comment.edit">{{ comment.content }}</label>
                  <div v-else class="flex flex-col">
                    <div class="input-group" v-if="commentForEdit">
                      <input
                        @keyup.esc="hideEditComment(comment)"
                        @keyup.enter="updateComment()"
                        :ref="`comment_input_${comment.id}`"
                        v-model="commentForEdit.content">
                      <button class="btn-primary" @click="updateComment()">Update</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="comment-inner flex justify-end pr-6">
              <small
                v-if="user && (comment.userId === user.id)"
                @click="showEditComment(comment)"
                class="color-medium cursor-pointer mt-3 mr-4 text-sm">
                  Edit
              </small>
              <small
                v-if="user && (comment.userId === user.id || post.userId === user.id)"
                @click="removeComment(comment.id)"
                class="color-medium cursor-pointer mt-3 text-sm">
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
import { createNamespacedHelpers } from 'vuex'
import { CommentService } from '@/api/commentApi'

const { mapGetters: userGetters } = createNamespacedHelpers('user')

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

<style lang="scss">
.comment-inner {
  padding-left: 54px;
}
</style>
