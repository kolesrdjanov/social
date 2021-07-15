import FormMessage from './shared/formMessage.vue'

const shared = {
  install(Vue) {
    Vue.component("form-message", FormMessage)
  }
}

export default shared;
