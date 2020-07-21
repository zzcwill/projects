import Layout from '@/layout'

export const appRoute = [
  {
    path: '/demo',
    component: Layout,
    name: 'Demo',
    meta: {
      title: '模板',
      icon: 'cs1'
    },
    hidden: process.env.NODE_ENV === 'production',
    children: [
      {
        path: 'icons',
        component: () => import('@/views/demo/icons/index'),
        name: 'Icons',
        meta: { title: 'Icons', icon: 'icon', noCache: true }
      },
      {
        path: 'table1',
        component: () => import('@/views/demo/table1/index'),
        name: 'Table1',
        meta: { title: '查询表格模板1' }
      }
    ]
  }
]

export default appRoute
