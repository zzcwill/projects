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
      },
      {
        path: 'table1',
        component: () => import('@/views/demo/table1/index'),
        name: 'table1',
        meta: { title: '查询表格模板1' }
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
