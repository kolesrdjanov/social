<template>
  <div>
    @{{ data.user.displayName }}
    {{ data.content }}
    {{ data.createdAt | moment('DD MMM YYYY h:mm A')  }}

    <div>
      <comments
        v-if="comments.length"
        :data="comments">
      </comments>
      <create-comment
        :post-id="data.id"
        @reloadComments="getComments">
      </create-comment>
    </div>
  </div>
</template>

<script>
import CreateComment from '@/components/comment/CreateComment.vue'
import Comments from '@/components/comment/Comments.vue'
import { CommentService } from '@/api/commentApi'

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

  data() {
    return {
      comments: []
    }
  },

  methods: {
    getComments
  },

  mounted() {
    this.getComments();
  }
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
