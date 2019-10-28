export default function apiUsers(store, router, api) {
  return {
    async getAdmins() {
      return await api.request.getRequest('admins/list')
    },

    async getUserCatalog(page = 1, dep = false, search = '') {
      let params = {
        page: page
      }

      if (dep !== false) params.dep = dep
      if (search !== '') params.search = search

      return await api.request.getRequest('users/catalog', params)
    },

    async getUser(id_phperson) {
      return await api.request.getRequest('users/catalog/' + id_phperson)
    },

    async getUserVisits(id_phperson) {
      return await api.request.getRequest('users/catalog/' + id_phperson + '/visits')
    },

    async getUserApprovalTasks(id_phperson) {
      return await api.request.getRequest('users/catalog/' + id_phperson + '/approval')
    },

    async getUserSessions(id_phperson) {
      return await api.request.getRequest('sessions/' + id_phperson)
    },

    async deleteUserSession(id_phperson, session_id) {
      return await api.request.postRequest('sessions/' + id_phperson, {
        session_id: session_id
      })
    },

    async clearUserSessions(id_phperson) {
      return await api.request.postRequest('sessions/' + id_phperson, {
        all: 1
      })
    },
  }
}