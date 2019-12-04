export default function apiNews(store, router, api) {
  return {
    async getTableauList(page = 1) {
      let params = {
        page: page
      }
      return await api.request.getRequest('tableau', params)
    },

    async getTableau(id) {
      return await api.request.getRequest('tableau/' + id)
    },

    async createTableau(item) {
      return await api.request.postRequest('tableau/create', item)
    },

    async updateTableau(id, item) {
      return await api.request.patchRequest('tableau/' + id, item)
    },

    async deleteTableau(id) {
      return await api.request.deleteRequest('tableau/' + id)
    },
  }
}