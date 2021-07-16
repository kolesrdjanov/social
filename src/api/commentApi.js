import restAPI from '@/config/http'

export default class CommentApi {
  getCommentsForPost(postId) {
    return restAPI({
      method: 'GET',
      url: `/posts/${postId}/comments`,
      params: {
          _sort: 'createdAt',
          _order: 'asc'
      }
    })
  }

  create(request) {
    return restAPI({
      method: 'POST',
      url: `/comments`,
      data: request
    })
  }

  remove(id) {
    return restAPI({
      method: 'DELETE',
      url: `/comments/${id}`
    })
  }

  update(request) {
    return restAPI({
      method: 'PUT',
      url: `/comments/${request.id}`,
      data: request.data
    })
  }
}

export const CommentService = new CommentApi()