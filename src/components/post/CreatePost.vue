<template>
  <div class="create-post--wrapper p-4 mb-6">
    <div class="mb-3">
      <span class="fw-500 mr-2">{{ `${user.firstname} ${user.lastname}` }}</span>
      <small class="fw-300">@{{ user.displayName }}</small>
    </div>
    <validation-observer
      ref="validator"
      v-slot="{ handleSubmit }">
      <validation-provider
          v-slot="{ errors, failedRules }"
          :rules="{ required: true }"
          class="flex flex-col">
          <textarea
            rows="6"
            v-model="post.content"
            name="Post content"
            placeholder="Your thoughts go here..">
          </textarea>
          
          <div v-if="errors" class="validation--wrapper mt-2">
              <span v-if="failedRules['required']">Post content is required</span>
          </div>

          <button
            @click="handleSubmit(submit)"
            class="mt-3">
              Post
          </button>
      </validation-provider>
    </validation-observer>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex"
import { PostService } from '@/api/postApi'

const { mapGetters: userGetters } = createNamespacedHelpers("user")

export default {
  data() {
    return {
      post: {
        content: ''
      }
    }
  },

  computed: {
    ...userGetters([
      'user'
    ])
  },

  methods: {
    submit,
    reloadFeed
  }
}

async function submit() {
  try {
    const request = {
      createdAt: Date.now(),
      content: this.post.content,
      user: {
        firstName: this.user.firstname,
        lastName: this.user.lastname,
        displayName: this.user.displayName
      }
    }

    await PostService.create(request)
    this.post.content = ''
    debugger
    this.$refs.validator.reset()
    this.reloadFeed()
  } catch(error) {
    console.log(error)
  }
}

function reloadFeed() {
  this.$emit('reloadFeed')
}

</script>

<style lang="scss">
.create-post--wrapper {
  background-color: white;
  position: sticky;
  top: 90px;
  border: 1px solid $color-border--light;
}
</style>


