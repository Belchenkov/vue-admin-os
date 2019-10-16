import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    inProgress: false,
    isAuth: null,
    profile: null,
  },

  mutations: {
    setIsAuth(state, isAuth) {
      this.state.isAuth = isAuth
    },

    setProfile(state, profile) {
      this.state.profile = profile
    },

    setInProgress(state, status) {
      this.state.inProgress = status
    },
  },

  actions: {},

  getters: {}
})