import restAPI from '@/config/http'
import store from '@/store'

export default class PostApi {
  getPosts(request = {}) {
    return restAPI({
      method: 'GET',
      url: '/posts',
      params: request,
      headers: {
        'Authorization': store.getters['user/token']
      }
    })
  }

  create(request) {
    return restAPI({
      method: 'POST',
      url: '/posts',
      data: request,
      headers: {
        'Authorization': store.getters['user/token']
      }
    })
  }

  update(request) {
    return restAPI({
      method: 'PUT',
      url: `/posts/${request.id}`,
      data: request.data,
      headers: {
        'Authorization': store.getters['user/token']
      }
    })
  }

  remove(id) {
    return restAPI({
      method: 'DELETE',
      url: `/posts/${id}`,
      headers: {
        'Authorization': store.getters['user/token']
      }
    })
  }
}

export const PostService = new PostApi()