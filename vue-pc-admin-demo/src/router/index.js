import Vue from 'vue'
import Router from 'vue-router'

// 同个路由跳转报错,重写push方法
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

/* modules */
// 模块按一级菜单来区分  例如 系统管理（一级菜单）-一些详情页路由添加方式-添加在/router/modules/xtgl/index.js里，里面有demo
import app from '@/router/app'
// 模板菜单下的路由
import demo from '@/router/demo'
// 平台管理
import ptgl from '@/router/modules/ptgl'
// 我的任务
import wdrw from '@/router/modules/wdrw'

export const constantRoutes = app.concat(demo, ptgl, wdrw)

const createRouter = () => new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
export default router
