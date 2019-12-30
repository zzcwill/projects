import Vue from 'vue'
import Router from 'vue-router'

// 系统相关
import app from '@/router/app.js'
// 模板相关
import demo from '@/router/demo.js'
// 用户绑定
import yhbd from '@/router/modules/yhbd'
// 访客预约
import fkyy from '@/router/modules/fkyy'
// 商家后台
import sjht from '@/router/modules/sjht'
// 食堂后台
import stht from '@/router/modules/stht'
// 物业后台
import wyht from '@/router/modules/wyht'

Vue.use(Router)

// 后续可添加模块,app模块放最后因为404跳转放路由最后
const constantRouterMap = demo.concat(yhbd,fkyy,sjht,stht,wyht,app)

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: constantRouterMap
})
