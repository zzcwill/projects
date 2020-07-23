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
					title: '我的任务详情页',
				}
			}
		]
	}
]

export default appRoute
