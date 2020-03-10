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
// 系统管理
import xtgl from '@/router/modules/xtgl'
// 平台管理
import ptgl from '@/router/modules/ptgl'
// 园区管理
import yqgl from '@/router/modules/yqgl'
// 设备管理
import sbgl from '@/router/modules/sbgl'
// 智慧大脑
import zhdn from '@/router/modules/zhdn'
// 企业管理
import qygl from '@/router/modules/qygl'
// 门户网站
import mhwz from '@/router/modules/mhwz'
// 财务管理
import cwgl from '@/router/modules/cwgl'
// 智卡管理
import zkgl from '@/router/modules/zkgl'
// 门禁权限
import mjqx from '@/router/modules/mjqx'
// 会议室管理
import hysgl from '@/router/modules/hysgl'
// 停车管理
import tcgl from '@/router/modules/tcgl'
// 访客管理
import fkgl from '@/router/modules/fkgl'
// 公共控制
import ggkz from '@/router/modules/ggkz'
// 商户管理
import shgl from '@/router/modules/shgl'
// 物业管理
import wygl from '@/router/modules/wygl'
// 综合服务
import zhfw from '@/router/modules/zhfw'
// 电子巡更
import dzxg from '@/router/modules/dzxg'
// 工作计划
import gzjh from '@/router/modules/gzjh'

export const constantRoutes = app.concat(demo, xtgl, ptgl, yqgl, sbgl, zhdn, qygl, mhwz, cwgl, zkgl, mjqx, hysgl, tcgl, fkgl, ggkz, shgl, wygl, zhfw, dzxg, gzjh)

const createRouter = () => new Router({
  // mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
