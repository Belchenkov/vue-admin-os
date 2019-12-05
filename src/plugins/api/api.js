import axios from 'axios';
import Cookies from 'js-cookie'
import ApiRequest from './api-requests'
import apiMixin from './api-mixin'
import apiAuth from './methods/auth'
import apiProfile from './methods/profile'
import apiUsers from "./methods/users";
import apiNews from "./methods/news";
import apiMailing from "./methods/mailing";
import apiTableau from "./methods/tableau";

export default {

  envSetup() {
    axios.defaults.baseURL = process.env.VUE_APP_API_ENTRYPOINT
  },

  interceptorsSetup(store, router, api) {
    axios.interceptors.request.use(async (request) => {
      store.commit('setInProgress', true)

      if (Cookies.get('access_token')) {
        if (parseInt(Cookies.get('access_token_expire_at')) < Math.floor(Date.now() / 1000) && request.url != 'auth/refresh') {
          let response = await this.request.postRequest('auth/refresh', {
            refresh_token: Cookies.get('refresh_token')
          });

          if (response.result && response.data.access_token) {
            Cookies.set('access_token', response.data.access_token)
            Cookies.set('access_token_expire_at', response.data.access_token_expire_at)
            Cookies.set('refresh_token', response.data.refresh_token)
            Cookies.set('refresh_token_expire_at', response.data.refresh_token_expire_at)
          }

        }

        request.headers.Authorization = 'Bearer ' + Cookies.get('access_token')
      }

      return request
    });

    axios.interceptors.response.use((config) => {
      store.commit('setInProgress', false)
      return config
    }, (error) => {
      store.commit('setInProgress', false)

      if (!error.response) {
        window.console.log("Error: internet connection", "color:red;")
        return Promise.reject(null);
      }

      if (error.response.status == 401) {
        window.console.log("Error: unauthorized", "color:red;")
        if (store.state.isAuth) {
          api.app.$apiAuth.clearCookieAndExit()
          router.push({name: 'login'})
        }
      }

      return Promise.reject(error)
    });
  },

  install(Vue, store, router) {
    this.envSetup()
    this.app = Vue.prototype;
    this.request = new ApiRequest()
    this.interceptorsSetup(store, router, this)

    Vue.mixin(apiMixin)

    Vue.prototype.$apiAuth = apiAuth(store, router, this)
    Vue.prototype.$apiProfile = apiProfile(store, router, this)
    Vue.prototype.$apiUsers = apiUsers(store, router, this)
    Vue.prototype.$apiNews = apiNews(store, router, this)
    Vue.prototype.$apiMailing = apiMailing(store, router, this)
    Vue.prototype.$apiTableau = apiTableau(store, router, this)
  }
}