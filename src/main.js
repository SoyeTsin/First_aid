import Vue from 'vue'
import App from './App.vue'
import router from './router';
import echarts from 'echarts'
import BaiduMap from 'vue-baidu-map'
import 'swiper/dist/css/swiper.css';


Vue.config.productionTip = false
Vue.prototype.$echarts = echarts;
Vue.use(BaiduMap, {
  /* Visit http://lbsyun.baidu.com/apiconsole/key for details about app key. */
  ak: 'FC728afebcfaf34502eec77b23a2ca40'
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
