<template>
  <div>
    <div class="mb-4 post-wrapper rounded-md px-3 pt-6 pb-3">
      <user-header
        :date="data.createdAt"
        :user="data.user">
      </user-header>
      <article v-if="!postForEdit" class="text-lg post-content color-dark">
        {{ data.content }}
      </article>
      <div v-else class="mt-4">
        <validation-observer
          ref="validator"
          v-slot="{ handleSubmit }">
          <validation-provider
              v-slot="{ errors, failedRules }"
              :rules="{ required: true }"
              class="flex flex-col">
              <div class="input-group">
                <input
                  type="text"
                  v-model="postForEdit.content"
                  name="Post content"
                  @keyup.enter="updateComment()"
                  @keyup.esc="closeEditPost()"
                  placeholder="What is happening?">

                <button
                  @click="handleSubmit(updateComment)"
                  class="btn-primary">
                    Update
                </button>
              </div>
              <form-message
                class="ml-7 mt-2"
                :text="failedRules['required']"
                :type="'error'"
                v-if="errors.length">
              </form-message>
          </validation-provider>
        </validation-observer>
      </div>
      <div class="inner">
        <div class="my-4 flex flex-row items-end">
          <small
            v-if="comments.length"
            @click="toggleComments()"
            class="cursor-pointer fw-500 color-medium fs-14">
              <i class="icon-comment"></i>
              {{ showComments ? 'Hide comments' : `${comments.length} comments` }}
          </small>
          <div v-if="user && user.id === data.user.id" class="ml-auto">
            <small @click="showEditPost()" class="cursor-pointer fw-500 color-medium fs-14 mr-4">
              Edit
            </small>
            <small @click="removePost()" class="cursor-pointer fw-500 color-medium fs-14">
              Remove
            </small>
          </div>
        </div>
        <div>
          <comments
            v-if="comments.length"
            v-show="showComments"
            :post="data"
            :data="comments"
            @reloadComments="getComments">
          </comments>
          <create-comment
            :post-id="data.id"
            @reloadComments="getComments">
          </create-comment>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CreateComment from '@/components/comment/CreateComment.vue'
import Comments from '@/components/comment/Comments.vue'
import { CommentService } from '@/api/commentApi'
import { createNamespacedHelpers } from 'vuex'
import { PostService } from '@/api/postApi'

const { mapGetters: userGetters } = createNamespacedHelpers('user')

export default {
  components: {
    CreateComment,
    Comments
  },

  props: {
    data: {
      type: Object
    }
  },

  computed: {
    ...userGetters([
      'user'
    ])
  },

  data() {
    return {
      showComments: false,
      comments: [],
      postForEdit: null
    }
  },

  methods: {
    updateComment,
    toggleComments,
    getComments,
    showEditPost,
    closeEditPost,
    removePost,
    reloadFeed
  },

  mounted() {
    this.getComments();
  }
}

function toggleComments() {
  this.showComments = !this.showComments
}

async function getComments(showComments = undefined) {
  try {
    const { data } = await CommentService.getCommentsForPost(this.data.id);
    this.comments = data;
    if (showComments) this.showComments = true
  } catch (error) {
    console.log(error)
  }
}

function showEditPost() {
  this.postForEdit = {...this.data}
}

function closeEditPost() {
  this.postForEdit = null
}

async function updateComment() {
  try {
    await PostService.update({
      id: this.data.id,
      data: this.postForEdit
    })
    this.closeEditPost()
    this.reloadFeed()
  } catch (error) {
    console.log(error)
  }
}

async function removePost() {
  try {
    await PostService.remove(this.data.id)
    this.reloadFeed()
  } catch (error) {
    console.log(error)
  }
}

function reloadFeed() {
  this.$emit('reloadFeed')
}
</script>

<style lang="scss">
.post-wrapper {
  padding: 20px 30px 30px 30px;
  border-radius: $size-base-border-radius;
  background-color: white;
  box-shadow: $shadow;
}

.post-content {
  margin-left: 72px;
}

.icon-comment {
  width: 24px;
  height: 24px;
  display: inline-block;
  vertical-align: bottom;
  margin-right: 6px;
}

.inner {
  margin-left: 72px;
}
</style>
