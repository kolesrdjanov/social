<template>
  <div>
    <div class="mb-4 post-wrapper rounded-md px-3 pt-6 pb-3">
      <user-header
        :user="data.user">
      </user-header>
      <article class="text-lg post-content color-dark">
        {{ data.content }}
      </article>
      <div class="flex flex-col">
        <small class="color-medium ml-auto">{{ data.createdAt | moment('DD MMM YYYY')  }}</small>
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
          <div v-if="user.id === data.user.id" class="ml-auto">
            <small class="cursor-pointer fw-500 color-medium fs-14 mr-4">
              Edit
            </small>
            <small class="cursor-pointer fw-500 color-medium fs-14">
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
import { createNamespacedHelpers } from "vuex"

const { mapGetters: userGetters } = createNamespacedHelpers("user")

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
      comments: []
    }
  },

  methods: {
    toggleComments,
    getComments
  },

  mounted() {
    this.getComments();
  }
}

function toggleComments() {
  this.showComments = !this.showComments
}

async function getComments() {
  try {
    const { data } = await CommentService.getCommentsForPost(this.data.id);
    this.comments = data;
  } catch (error) {
    console.log(error)
  }
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
