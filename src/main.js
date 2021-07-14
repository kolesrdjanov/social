import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Moment from "vue-moment"
import "@/plugins/VeeValidate"
import "@/assets/scss/main.scss"
import "@/assets/scss/tailwind.scss"

Vue.use(Moment)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
