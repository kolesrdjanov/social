<template>
  <div class="auth-form h-full flex flex-col justify-center">
    <h2 class="color-dark fw-700 text-4xl mb-4 mt-auto">Register</h2>
    <p class="color-medium mb-8">
      Please enter all informations so<br>
      you can access to your profile and start posting!
    </p>
    <validation-observer
      ref="validator"
      v-slot="{ handleSubmit }">
      <validation-provider
        v-slot="{ errors, failedRules }"
        :rules="{ required: true }"
        class="flex flex-col mb-6">
        <div class="auth-form--input-group">
          <label class="fw-700 mb-2">First name</label>
          <input
            type="text"
            placeholder="First name"
            v-model="user.firstname"
            name="First name">
        </div>
        <form-message
          class="mt-2"
          v-if="errors.length"
          :type="'error'"
          :text="failedRules['required']">
        </form-message>
      </validation-provider>

      <validation-provider
        v-slot="{ errors, failedRules }"
        :rules="{ required: true }"
        class="flex flex-col mb-6">
        <div class="auth-form--input-group">
          <label class="fw-700 mb-2">Last name</label>
          <input
            type="text"
            placeholder="Last name"
            v-model="user.lastname"
            name="Last name">
        </div>
        <form-message
          class="mt-2"
          v-if="errors.length"
          :type="'error'"
          :text="failedRules['required']">
        </form-message>
      </validation-provider>

      <validation-provider
        v-slot="{ errors, failedRules }"
        :rules="{ required: true }"
        class="flex flex-col mb-6">
        <div class="auth-form--input-group">
          <label class="fw-700 mb-2">Display name</label>
          <input
            type="text"
            placeholder="Display name"
            v-model="user.dsiplayName"
            name="Display name">
        </div>
        <form-message
          class="mt-2"
          v-if="errors.length"
          :type="'error'"
          :text="failedRules['required']">
        </form-message>
      </validation-provider>

      <validation-provider
        v-slot="{ errors, failedRules }"
        :rules="{ required: true }"
        class="flex flex-col">
        <div class="auth-form--input-group">
          <label class="fw-700 mb-2">Username</label>
          <input
            @input="debouncedCheckUsername"
            type="text"
            placeholder="Username"
            v-model="user.username"
            name="Username">
        </div>
        <form-message
          class="mt-2"
          v-if="error.length"
          :type="'error'"
          :text="error">
        </form-message>
        <form-message
          class="mt-2"
          v-if="errors.length"
          :type="'error'"
          :text="failedRules['required']">
        </form-message>
      </validation-provider>

      <validation-provider
        v-slot="{ errors, failedRules }"
        :rules="{ required: true }"
        class="flex flex-col mt-6">
        <div class="auth-form--input-group">
          <label class="fw-700 mb-2">Password</label>
          <input
            type="password"
            placeholder="Password"
            v-model="user.password"
            name="Password">
        </div>
        <form-message
          class="mt-2"
          v-if="errors.length"
          :type="'error'"
          :text="failedRules['required']">
        </form-message>
      </validation-provider>

      <button
        @click="handleSubmit(validate)"
        class="btn-primary mt-10">
          Create Account
      </button>
    </validation-observer>


    <div class="auth-form--footer mt-auto">
      <label class="block mb-1">Already have an account?</label>
      <a class="fw-700 underline cursor-pointer" @click="$router.push('/sign-in')">Login here</a>
    </div>
  </div>
</template>

<script>
import { AuthService } from '@/api/authApi'
import { UserService } from '@/api/userApi'
import _debounce from "lodash/debounce";
import FormMessage from '../../components/shared/FormMessage.vue';

const icons = [
  'peach',
  'lemon',
  'pine',
  'cherry'
]

const SEARCH_TIMEOUT = 300

export default {
  components: { FormMessage },
   data() {
     return {
       error: '',
       user: {
         firstname: '',
         lastname: '',
         displayName: '',
         username: '',
         password: '',
         icon: icons[Math.floor(Math.random() * icons.length)]
       }
     }
   },

   methods: {
     validate,
     debouncedCheckUsername: _debounce(checkUsername, SEARCH_TIMEOUT),
     submit
   }
}

async function validate() {
  if (this.error.length) {
    return
  }
  // validate form

  this.submit()
}

async function checkUsername() {
  this.error = ''

  if (this.user.username.length) {
    const { data } = await UserService.getUserByUsername({
      username: this.user.username
    })

    if (data.length) {
      // user exist
      this.error = "Username is taken. Please use something else."
    }
  } 
}

async function submit() {
  const { data } = await AuthService.register(this.user)
  if (data) {
    this.$router.push({
      name: 'signIn',
      query: {
        register: 'success'
      }
    })
  }
}
</script>