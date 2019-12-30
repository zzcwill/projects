const userRoute = [
	{
		path: '/ytj',
		name: 'ytj',
		component: ()=>import('@/views/ytj/index'),
		meta:{title:'一体机'}
	},
	{
		path:'/ytj/kpfw',
		name:'ytjKpfw',
		component: ()=>import('@/views/ytj/ytj-kpfw/index'),
		meta:{title:'一体机卡片服务'}
	},
	{
		path:'/ytj/fkdj',
		name:'ytjfkdj',
		component: ()=>import('@/views/ytj/ytj-fkdj/index'),
		meta:{title:'一体机访客登记'}
	},
	{
		path:'/ytj/xfcx',
		name:'ytjxfcx',
		component: ()=>import('@/views/ytj/ytj-xfcx/index'),
		meta:{title:'一体机消费查询'}
	}	
]

export default userRoute