import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './plugins/router/router'
import Api from './plugins/api/api'
import './registerServiceWorker'
import vuetify from './plugins/vuetify'
import CKEditor from '@ckeditor/ckeditor5-vue'

//import './styles/sass/main.scss'

Vue.use(Api, store, router)
Vue.config.productionTip = false
Vue.use(CKEditor)

new Vue({
  router,
  store,
  vuetify,
  render: function (h) { return h(App) }
}).$mount('#app')
