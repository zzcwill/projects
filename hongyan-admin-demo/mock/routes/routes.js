// Just a mock data

export const asyncRoutes = [ 
  {
    path: '/route',
    component: 'layout/index',
    redirect: 'route1',
    children: [
      {
        path: 'route1',
        component: 'views/demo/route/index',
        name: 'Route1',
        meta: { 
          title: 'mock-route1', 
          icon: 'hy3'
        }
      }          
    ]
  },  
  {
    path: 'route-link',
    component: 'layout/index',
    children: [
      {
        path: 'https://www.baidu.com/',
        meta: { 
          title: 'route-link', 
          icon: 'link' 
        }
      }
    ]
  },  
  { path: '*', redirect: '/404', hidden: true }
]
