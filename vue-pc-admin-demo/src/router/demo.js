import Layout from '@/layout'

export const appRoute = [
  {
    path: '/demo',
    component: Layout,
    name: 'Demo',
    meta: {
      title: '模板',
      icon: 'hy33'
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
        meta: { title: '查询表格模板1' }
      }
    ]
  }
]

export default appRoute
