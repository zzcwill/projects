// 项目需要引入包
import Vue from 'vue'
// axios是基于promise来实现的，解决对IE 和低版本的设备不支持 promise的问题
import 'babel-polyfill'

// 让网页根据设备dpr和宽度，利用viewport和html根元素的font-size配合rem来适配不同尺寸的移动端设备
import '@/utils/flexible.js'
// 引入全局过滤器
import '@/filters'
// 项目需要引入文件
import App from '@/App.vue'
import './registerServiceWorker'
import router from '@/router'
// 引入字体库-暂时用vant(有赞图标库)，需要在iconfont网址添加项目引入
//import '@/assets/icons/iconfont.css'
// 引入css样式重置
import 'normalize.css/normalize.css'
// 引入css公共样式
import '@/styles/common.less'
// 引入路由权限控制
import '@/permission'

import Loadsh from 'loadsh'
import Moment from 'moment'

Vue.config.productionTip = false

// 公共方法引入
Vue.prototype._ = Loadsh
Vue.prototype.moment = Moment

//引入有赞组件库
import Vant from 'vant'
import 'vant/lib/index.css'

Vue.use(Vant)

// 更改.env.development的VUE_APP_BASE_API为 mock即可mock数据
import { mockXHR } from '../mock'
if (process.env.VUE_APP_BASE_API === '/mock') {
  mockXHR()
}

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
