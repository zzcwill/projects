import Layout from '@/layout'

export const appRoute = [
  {
    path: '/demo',
    component: Layout,
    children: [
      {
        path: 'icons',
        component: () => import('@/views/demo/icons/index'),
        name: 'icons',
        meta: { title: '图标库', noCache: true }
      }
    ],
    name: 'demo',
    meta: {
      title: '模板',
      icon: 'cs1'
    }, 
    hidden: process.env.NODE_ENV === 'production'
  }
]

export default appRoute
