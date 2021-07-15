const initialData = () => ({
	info: null
})

export default {
	namespaced: true,

	state: {
		...initialData()
	},

	mutations: {
        setUser,
		resetState
	},

	getters: {
		user: state => state.info
	},

	actions: {
		signOut
	}
}

function setUser(state, info) {
	state.info = info
}

async function signOut({ commit }) {
	commit("resetState")
}

function resetState(state) {
	Object.assign(state, {
		...initialData()
	})
}
