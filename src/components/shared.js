import FormMessage from './shared/FormMessage.vue'
import UserAvatar from './shared/UserAvatar.vue'
import UserHeader from './shared/UserHeader.vue'

const shared = {
  install(Vue) {
    Vue.component("form-message", FormMessage)
    Vue.component("user-avatar", UserAvatar)
    Vue.component("user-header", UserHeader)
  }
}

export default shared;
