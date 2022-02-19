import restAPI from '@/config/http'

export default class AuthApi {
	// using GET method to match user with provided username/password
	signIn(request) {
		return restAPI({
			method: 'POST',
			url: `/user/login`,
      data: request
		})
	}

	register(request) {
		return restAPI({
			method: 'POST',
			url: '/user/register',
			data: request
		})
	}
}

export const AuthService = new AuthApi()