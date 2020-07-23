import Layout from '@/layout'

const appRoute = [
	{
		path: '/wdrw/wdrw/page',
		component: Layout,
		hidden: true,
		children: [
			{
				path: 'info',
				name: 'wdrwWdrwPageInfo',
				component: () => import('@/views/wdrw/wdrw/info'),
				meta: {
					title: '贷款详情页',
				}
			},
			{
				path: 'flow',
				name: 'wdrwWdrwPageFlow',
				component: () => import('@/views/wdrw/wdrw/flow'),
				meta: {
					title: '贷款申请流程',
				}
			}			
		]
	}
]

export default appRoute
