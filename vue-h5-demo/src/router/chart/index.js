const chartDemo = () => import('@/views/chart/chartDemo.vue')
const chartDemo2 = () => import('@/views/chart/chartDemo2.vue')

const chartRoute = [
	{
		path: '/chartDemo',
		name: 'chartDemo',
		component: chartDemo
	},
	{
		path: '/chartDemo2',
		name: 'chartDemo2',
		component: chartDemo2
	}			
]

export default chartRoute
