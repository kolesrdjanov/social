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

  createComment(request) {
    return restAPI({
      method: 'POST',
      url: `/comments`,
      data: request
    })
  }
}

export const CommentService = new CommentApi()