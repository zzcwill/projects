const chartDemo = () => import('@/views/chart/chartDemo.vue')
const chartDemo2 = () => import('@/views/chart/chartDemo2.vue')
const chartDemo3 = () => import('@/views/chart/chartDemo3.vue')
const chartDemo4 = () => import('@/views/chart/chartDemo4.vue')

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
	},
	{
		path: '/chartDemo3',
		name: 'chartDemo3',
		component: chartDemo3
	},
	{
		path: '/chartDemo4',
		name: 'chartDemo4',
		component: chartDemo4
	}		
]

export default chartRoute
