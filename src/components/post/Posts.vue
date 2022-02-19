<template>
  <div class="flex flex-grow w-full xl:w-auto">
    <div class="posts-container flex flex-col flex-grow sm:pr-0 xl:pr-10 w-full">
      <create-post
        v-if="$route.name === 'home'"
        @reloadFeed="getPosts">
      </create-post>
      <post
        v-for="post in posts"
        :key="post.id"
        :data="post"
        @reloadFeed="getPosts"
        class="mb-10">
      </post>
      <div class="text-center">
        <div v-if="!posts.length && loading">
          <p class="mt-4 color-medium fs-14 fw-700">Loading..</p>
        </div>
        <div v-else-if="$route.name === 'profile' && !posts.length && !loading">
          <p class="mt-10 color-medium fs-14 fw-700">Still no posts? Get back on home and start posting!</p>
        </div>
        <div v-else-if="$route.name === 'home' && !posts.length && !loading">
          <p class="mt-4 color-medium fs-14 fw-700">Nothing to show..</p>
        </div>
      </div>
    </div>
    <div class="search-container hidden xl:visible xl:flex">
      <search
        v-if="$route.name === 'home'"
        @input="getPosts">
      </search>
    </div>
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
      loading: false,
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
  this.loading = true
  try {
    const request = {}
    if (this.$route.params.userId) {
      request.userId = this.$route.params.userId
    }

    const { data } = await PostService.getPosts({
      ...params,
      ...request
    })
    this.posts = data;
  } catch (error) {
    console.log(error)
  } finally {
    this.loading = false
  }
}
</script>

<style lang="scss">
.posts-container {
  max-width: 800px;
  margin: 0 auto;
}

.search-container {
  width: 300px;
  flex-shrink: 0;
  flex-flow: column;

  > * {
    position: sticky;
    top: 40px;
  }
}
</style>