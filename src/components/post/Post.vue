<template>
  <div>
    <div class="mb-4 post-wrapper rounded-md px-3 pt-6 pb-3">
      <div class="post--user">
        <span class="fw-500 mr-2">{{ `${data.user.firstName} ${data.user.lastName}` }}</span>
        <small class="fw-300">@{{ data.user.displayName }}</small>
      </div>
      <article class="text-lg my-2 post-content p-4">
        {{ data.content }}
      </article>
      <small>{{ data.createdAt | moment('DD MMM YYYY h:mm A')  }}</small>
      <div v-if="user.id === data.user.id">
        <small class="underline cursor-pointer">Remove</small>
      </div>
      <div class="mt-4 mb-4">
        <small
          v-if="comments.length"
          @click="toggleComments()"
          class="underline cursor-pointer">
            {{ showComments ? 'Hide comments' : `Show ${comments.length} comments` }}
        </small>
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
  border: 1px solid $color-border--light;
}
.post-content {
  
}
</style>
