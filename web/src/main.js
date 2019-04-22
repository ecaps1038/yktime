import Vue from 'vue'
import App from './App'
import router from './router/index'
import store from './store/store'

//引入elememt-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import axios from 'axios'

Vue.config.debug = true
Vue.config.productionTip = false
Vue.prototype.$axios = axios

Vue.use(ElementUI);

axios.defaults.withCredentials = true


new Vue({
  el: '#app',
  router: router,
  store: store,
  template: '<App/>',
  components: { App }
})
