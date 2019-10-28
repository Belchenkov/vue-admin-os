export default function apiMailing(store, router, api) {
  return {
    async getMailingList(page = 1) {
      let params = {
        page: page
      }
      return await api.request.getRequest('mailing', params)
    },

    async createMailing(mailing) {
      return await api.request.postRequest('mailing/create', mailing)
    },

  }
}