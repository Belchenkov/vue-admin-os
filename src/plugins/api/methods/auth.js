import Cookies from 'js-cookie'
import axios from "axios";

export default function apiAuth(store, router, api) {
  return {
    async checkAuth() {
      if (store.state.isAuth !== null) return
      if (Cookies.get('access_token')) {
        let profile = await api.app.$apiProfile.getProfile()
        if (profile.result && profile.data.tab_no) {
          store.commit('setIsAuth', true)
        }
      } else
        store.commit('setIsAuth', false)
    },

    async login(email, password) {
      let response = await api.request.postRequest('auth/login', {
        email: email,
        password: password
      })

      if (response.result && response.data.access_token) {
        Cookies.set('access_token', response.data.access_token)
        Cookies.set('access_token_expire_at', response.data.access_token_expire_at)
        Cookies.set('refresh_token', response.data.refresh_token)
        Cookies.set('refresh_token_expire_at', response.data.refresh_token_expire_at)

        store.commit('setIsAuth', true)
        await api.app.$apiProfile.getProfile()
      }

      return response
    },

    async signOut() {
      await api.request.postRequest('auth/logout')

      this.clearCookieAndExit()
      router.push({name: 'login'})
    },

    clearCookieAndExit() {
      Cookies.set('access_token', '')
      Cookies.set('access_token_expire_at', '')
      Cookies.set('refresh_token', '')
      Cookies.set('refresh_token_expire_at', '')

      store.commit('setIsAuth', null)
      store.commit('setProfile', false)
    }
  }
}