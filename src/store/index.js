import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from "vuex-persist"
import user from './modules/user'

Vue.use(Vuex)

const vuexLocalStorage = new VuexPersist({
  key: 'socy',
  modules: [ "user" ]
  }),
  state = {
  },
  mutations = {
  },
  actions = {
  },
  getters = {
  },
  modules = {
    user
  },
  plugins = [vuexLocalStorage.plugin]

export default new Vuex.Store({
  state,
	mutations,
	actions,
	getters,
	modules,
	plugins
})
