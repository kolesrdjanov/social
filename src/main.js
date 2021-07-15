import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Moment from 'vue-moment'
import Shared from '@/components/shared'
import "@/plugins/VeeValidate"
import "@/styles/main.scss"
import "@/styles/tailwind.scss"

Vue.use(Moment)
Vue.use(Shared)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
