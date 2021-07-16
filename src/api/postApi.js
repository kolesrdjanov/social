import restAPI from '@/config/http'

export default class PostApi {
  getPosts(request = {}) {
    return restAPI({
      method: 'GET',
      url: '/posts',
      params: {
          ...request,
          _sort: 'createdAt',
          _order: 'desc'
      }
    })
  }

  create(request) {
    return restAPI({
      method: 'POST',
      url: '/posts',
      data: request
    })
  }
}

export const PostService = new PostApi()