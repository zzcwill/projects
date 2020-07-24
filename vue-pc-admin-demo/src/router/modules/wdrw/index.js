import Layout from '@/layout'

const appRoute = [
	{
		path: '/wdrw/wdrw/page',
		component: Layout,
		hidden: true,
		children: [
			{
				path: 'info',
				name: 'wdrwWdrwInfo',
				component: () => import('@/views/wdrw/wdrw/info'),
				meta: {
					title: '贷款详情',
				}
			},
			{
				path: 'imgInfo',
				name: 'wdrwWdrwImgInfo',
				component: () => import('@/views/wdrw/wdrw/imgInfo'),
				meta: {
					title: '贷款多媒体详情',
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
