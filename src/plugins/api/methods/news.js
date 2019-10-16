export default function apiNews(store, router, api) {
  return {
    async getNewsList(page = 1) {
      let params = {
        page: page
      }
      return await api.request.getRequest('news', params)
    },

    async getNews(id) {
      return await api.request.getRequest('news/' + id)
    },

    async createNews(news) {
      return await api.request.postRequest('news/create', news)
    },

    async updateNews(id, news) {
      return await api.request.patchRequest('news/' + id, news)
    },

    async deleteNews(id) {
      return await api.request.deleteRequest('news/' + id)
    },
  }
}