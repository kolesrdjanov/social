<template>
  <div class="create-post--wrapper p-4 mb-10 w-full">
    <user-header
      class="mb-4"
      :user="user">
    </user-header>
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
              v-model="post.content"
              @keyup.enter="handleSubmit(submit)"
              name="Post content"
              placeholder="What is happening?">

            <button
              @click="handleSubmit(submit)"
              :disabled="saving"
              class="btn-primary">
                Post
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
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { PostService } from '@/api/postApi'

const { mapGetters: userGetters } = createNamespacedHelpers('user')

export default {
  data() {
    return {
      saving: false,
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
      content: this.post.content
    }

    this.saving = true

    await PostService.create(request)
    this.post.content = ''
    this.$refs.validator.reset()
    this.reloadFeed()
  } catch(error) {
    console.log(error)
  } finally {
    this.saving = false
  }
}

function reloadFeed() {
  this.$emit('reloadFeed')
}

</script>

<style lang="scss">
.create-post--wrapper {
  padding: 20px 30px 30px 30px;
  border-radius: $size-base-border-radius;
  background-color: white;
  box-shadow: $shadow;
  z-index: 1000;
}
</style>


