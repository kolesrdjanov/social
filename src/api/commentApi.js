import restAPI from '@/config/http'
import store from '@/store'

export default class CommentApi {
  getCommentsForPost(postId) {
    return restAPI({
      method: 'GET',
      url: `/comments/post/${postId}`,
      headers: {
        'Authorization': store.getters['user/token']
      }
    })
  }

  create(request) {
    return restAPI({
      method: 'POST',
      url: `/comments`,
      data: request,
      headers: {
        'Authorization': store.getters['user/token']
      }
    })
  }

  remove(id) {
    return restAPI({
      method: 'DELETE',
      url: `/comments/${id}`,
      headers: {
        'Authorization': store.getters['user/token']
      }
    })
  }

  update(request) {
    return restAPI({
      method: 'PUT',
      url: `/comments/${request.id}`,
      data: request.data,
      headers: {
        'Authorization': store.getters['user/token']
      }
    })
  }
}

export const CommentService = new CommentApi()