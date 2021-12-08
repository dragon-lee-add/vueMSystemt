// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './vuex/store'
import * as echarts from 'echarts';
import axios from 'axios'
import SIdentify from './components/identify' //注意引入路径

Vue.use(SIdentify)
Vue.prototype.axios=axios;
Vue.prototype.$echarts = echarts
Vue.use(ElementUI);
Vue.config.productionTip = false



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

