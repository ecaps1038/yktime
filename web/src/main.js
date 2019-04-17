import Vue from 'vue'
import App from './App'
import router from './router/index'
import store from './store/store'

import axios from 'axios'

Vue.config.debug = true
Vue.config.productionTip = false
Vue.prototype.$axios = axios

axios.defaults.withCredentials = true
// axios.create({
//     baseURL: 'http://127.0.0.1:4040',
//     timeout: 5000,
//     withCredentials: true, //表示跨域请求时是否需要使用凭证，默认为false
//     headers: {
//         'Content-Type': 'application/json',
//         'Cache-Control': 'no-cache'
//     }
// })

//axios.defaults.baseURL = '/api'
//axios.defaults.headers.post['Content-Type'] = 'application/json';

//Vue.config.productionTip = false

new Vue({
  el: '#app',
  router: router,
  store: store,
  template: '<App/>',
  components: { App }
})
