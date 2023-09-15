import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import store from './store'
// 引入mockjs
import './mock/index.js'
import './directives/index.js'

// 引入自定义工具函数
// 在其他组件用this.$inserted('按钮权限标识')调用
// import { checkPermission } from './utils/utils.js';
// Vue.prototype.$inserted = checkPermission;




Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  
  router,
  store,
  render: h => h(App),
}).$mount('#app')
