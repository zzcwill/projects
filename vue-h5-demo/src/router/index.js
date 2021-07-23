import Vue from 'vue'
import Router from 'vue-router'

import user from '@/router/user'
import app from '@/router/app'
import chart from '@/router/chart'

Vue.use(Router)

// 后续可添加模块
const constantRouterMap = user.concat(chart, app)

console.info(constantRouterMap)

export default new Router({
  mode: 'history',
  routes: constantRouterMap
})
