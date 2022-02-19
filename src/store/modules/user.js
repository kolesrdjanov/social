const initialData = () => ({
	info: null,
  token: null
})

export default {
	namespaced: true,

	state: {
		...initialData()
	},

	mutations: {
    setUser,
    setToken,
    resetState
	},

	getters: {
		user: state => state.info,
    token: state => state.token
	},

	actions: {
		signOut
	}
}

function setUser(state, info) {
	state.info = info
}

function setToken(state, token) {
  state.token = token
}

async function signOut({ commit }) {
	commit("resetState")
}

function resetState(state) {
	Object.assign(state, {
		...initialData()
	})
}
