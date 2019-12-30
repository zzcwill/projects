import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
import loadsh from 'loadsh'
import moment from 'moment'

import VueQuillEditor from 'vue-quill-editor' // 富文本编辑器
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

// 引入全局过滤器
import '@/filters'

// 更改.env.development的VUE_APP_BASE_API为 mock即可mock数据
import { mockXHR } from '../mock'
if (process.env.VUE_APP_BASE_API === '/mock') {
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, 
  {
    locale,
    size: 'small'
  }
)
Vue.use(VueQuillEditor)

Vue.config.productionTip = false

// 公共方法引入
Vue.prototype._ = loadsh
Vue.prototype.moment = moment

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
