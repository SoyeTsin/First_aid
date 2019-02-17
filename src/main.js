import Vue from 'vue'
import App from './App.vue'
import router from './router';
import echarts from 'echarts'
import BaiduMap from 'vue-baidu-map'
import 'swiper/dist/css/swiper.css';
import axios from 'axios'
import {post,fetch,patch,put} from './utils/http'
//定义全局变量
Vue.prototype.$post=post;
Vue.prototype.$fetch=fetch;
Vue.prototype.$patch=patch;
Vue.prototype.$put=put;

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
