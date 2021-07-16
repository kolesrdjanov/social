<template>
  <div>
    <search
      @input="getPosts">
    </search>
    <create-post
      @reloadFeed="getPosts">
    </create-post>
    <post
      v-for="post in posts"
      :key="post.id"
      :data="post"
      class="mb-8">
    </post>
  </div>
</template>

<script>
import CreatePost from '@/components/post/CreatePost.vue'
import Post from '@/components/post/Post.vue'
import Search from '@/components/search/search.vue'
import { PostService } from '@/api/postApi'

export default {
  components: {
    CreatePost,
    Post,
    Search
  },

  data() {
    return {
      posts: []
    }
  },

  methods: {
    getPosts
  },

  mounted() {
    this.getPosts()
  }
}

async function getPosts(params) {
  try {
    const { data } = await PostService.getPosts(params)
    this.posts = data;
  } catch (error) {
    console.log(error)
  }
}
</script>