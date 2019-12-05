import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },  
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'hy1', affix: true }
    }]
  },

  {
    path: '/demo',
    component: Layout,
    name: 'Demo',
    meta: {
      title: '模板',
      icon: 'hy2'
    },
    children: [
      {
        path: 'icons',
        component: () => import('@/views/demo/icons/index'),
        name: 'Icons',
        meta: { title: 'Icons', icon: 'icon', noCache: true }
      },
      {
        path: 'clipboard',
        component: () => import('@/views/demo/clipboard/index'),
        name: 'Clipboard',
        meta: { title: 'clipboard', icon: 'clipboard' }
      }, 
      {
        path: 'pdf',
        component: () => import('@/views/demo/pdf/index'),
        name: 'PDF',
        meta: { title: 'PDF', icon: 'pdf' }
      },
      {
        path: 'pdf/download',
        component: () => import('@/views/demo/pdf/download'),
        hidden: true
      },                
      {
        path: 'table1',
        component: () => import('@/views/demo/table1/index'),
        name: 'Table1',
        meta: { title: 'table1', icon: 'hy6' }        
      },
      {
        path: 'table1-2',
        component: () => import('@/views/demo/table1/table1-2'),
        name: 'Table1-2',
        meta: { title: 'table1-2' },
        hidden: true       
      },
      {
        path: 'table2',
        component: () => import('@/views/demo/table2/index'),
        name: 'Table2',
        meta: { title: 'table2' }     
      },      
      {
        path: 'home',
        component: () => import('@/views/demo/home/index'),
        name: 'Home22',
        meta: { title: 'home' }    
      },
      {
        path: 'form1',
        component: () => import('@/views/demo/form1/index'),
        name: 'Form1',
        meta: { title: 'form1' }    
      },
      {
        path: 'popup',
        component: () => import('@/views/demo/popup/index'),
        name: 'Popup',
        meta: { title: 'popup' }    
      }                                  
    ]
  }  
]

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
