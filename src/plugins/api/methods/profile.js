export default function apiProfile(store, router, api) {
  return {
    async getProfile() {
      let profile = await api.request.getRequest('profile')

      if (profile.result && profile.data.id_phperson) {
        store.commit('setProfile', profile.data)
      }

      return profile
    },

  }
}