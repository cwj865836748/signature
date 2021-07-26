import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { get, post } from './plugins/axios'
import './plugins/elementUi'
import echarts from 'echarts'
import Videojs from 'video.js'
import 'video.js/dist/video-js.css'
Vue.config.productionTip = false
Vue.prototype.$axios = { get, post }
Vue.prototype.$echarts = echarts
Vue.prototype.$video = Videojs
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
