import Vue from 'vue'
import App from './App'
import router from './router/index'
import store from './store/store'
import globalVariable from '@/static/js/global_variable.js'

//引入elememt-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import axios from 'axios'

Vue.config.debug = true
Vue.config.productionTip = false
Vue.prototype.$axios = axios

Vue.use(ElementUI);

//引入全局变量
Vue.prototype.GLOBAL = globalVariable

axios.defaults.withCredentials = true

//lottie动画
import lottie from 'vue-lottie';
Vue.component('lottie', lottie)


new Vue({
  el: '#app',
  router: router,
  store: store,
  template: '<App/>',
  components: { App }
})
