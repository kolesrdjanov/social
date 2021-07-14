import restAPI from '@/config/http'

export default class AuthApi {
	// using GET method to match user with provided username/password
	signIn(request) {
		return restAPI({
			method: 'GET',
			url: `/users`,
            params: request
		})
	}

	register(request) {
		return restAPI({
			method: 'POST',
			url: '/users',
			data: request
		})
	}
}

export const AuthService = new AuthApi()