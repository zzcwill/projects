import Layout from '@/layout'

export const appRoute = [
  {   
    path: '/redirect',
    component: Layout,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')     
      }
    ],  
    hidden: true
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    name:'login',
    hidden: true
  },
  {
    path: '/nopage',
    component: () => import('@/views/nopage'),
    name: 'nopage',
    hidden: true
  },
  {
    path: '/nopc',
    component: () => import('@/views/nopc'),
    name: 'nopc',
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
