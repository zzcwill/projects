import Vue from 'vue'
import Router from 'vue-router'

import user from '@/router/user'
import car from '@/router/car'
import app from '@/router/app'

Vue.use(Router)

// 后续可添加模块
const constantRouterMap = user.concat(car).concat(app)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: constantRouterMap
})
