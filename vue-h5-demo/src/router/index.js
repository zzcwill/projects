import Vue from 'vue'
import Router from 'vue-router'

import user from '@/router/user'
import demo from '@/router/demo'
import app from '@/router/app'

Vue.use(Router)

// 后续可添加模块
const constantRouterMap = user.concat(demo, app)

export default new Router({
  mode: 'history',
  routes: constantRouterMap
})
