import restAPI from '@/config/http'

export default class UserApi {
	getMe(id) {
		return restAPI({
			method: 'GET',
			url: `/users/${id}`
		})
	}

	getUserByUsername(request) {
		return restAPI({
			method: 'GET',
			url: '/users',
			params: request
		})
	}
}

export const UserService = new UserApi()