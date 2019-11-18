// 项目需要引入包
import Vue from 'vue'
// axios是基于promise来实现的，解决对IE 和低版本的设备不支持 promise的问题
import 'babel-polyfill'

// 引入全局过滤器
import '@/filters'
// 项目需要引入文件
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
// 引入字体库
//import '@/assets/icons/iconfont.css'
// 引入css样式重置
import 'normalize.css/normalize.css'
// 引入css公共样式
import '@/assets/styles/common.less'
// 引入路由权限控制
import '@/permission'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')