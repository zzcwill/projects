import Vue from 'vue'

// 动态修改路由meta信息
import MetaInfo from 'vue-meta-info'

import Tip from './tip'
import Popup from './popup'

// 第三方插件
Vue.use(MetaInfo)

// 自定义公共插件($za调用)
Vue.use(Tip)
Vue.use(Popup)