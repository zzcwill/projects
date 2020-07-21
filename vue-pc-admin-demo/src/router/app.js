import Layout from '@/layout'

export const appRoute = [
  {   
    path: '/redirect',
    component: Layout,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index'),
        name:'redirect',
        meta: { title: 'redirect' }        
      }
    ],  
    hidden: true
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    name:'login',    
    meta: { title: '登录' },
    hidden: true
  },

  {
    path: '/nopage',
    component: () => import('@/views/nopage'),
    name: 'nopage',
    meta: { title: '没有页面' },
    hidden: true
  },

  {
    path: '/',
		component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      name: 'dashboard',
      meta: { title: '首页', affix: true }
    }],
		hidden: true   
  }
]

export default appRoute
