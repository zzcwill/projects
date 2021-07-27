const demo = () => import('@/views/demo/index.vue')

const chart = () => import('@/views/demo/chart/chart.vue')
const chart2 = () => import('@/views/demo/chart/chart2.vue')
const chart3 = () => import('@/views/demo/chart/chart3.vue')
const chart4 = () => import('@/views/demo/chart/chart4.vue')

const ajax = () => import('@/views/demo/ajax.vue')
const plug = () => import('@/views/demo/plug.vue')
const store = () => import('@/views/demo/store.vue')
const store2 = () => import('@/views/demo/store2.vue')

const filter = () => import('@/views/demo/filter.vue')
const componentPage = () => import('@/views/demo/componentPage.vue')

const img = () => import('@/views/demo/img.vue')

const demoRoute = [
	{
		path: '/demo',
		name: 'demo',
		component: demo
	},	

	{
		path: '/demo/chart',
		name: 'chart',
		component: chart
	},
	{
		path: '/demo/chart2',
		name: 'chart2',
		component: chart2
	},
	{
		path: '/demo/chart3',
		name: 'chart3',
		component: chart3
	},
	{
		path: '/demo/chart4',
		name: 'chart4',
		component: chart4
	},

	{
		path: '/demo/ajax',
		name: 'ajax',
		component: ajax
	},

	{
		path: '/demo/plug',
		name: 'plug',
		component: plug
	},

	{
		path: '/demo/store',
		name: 'store',
		component: store
	},
	{
		path: '/demo/store2',
		name: 'store2',
		component: store2
	},	

	{
		path: '/demo/filter',
		name: 'filter',
		component: filter
	},
	
	{
		path: '/demo/component',
		name: 'component',
		component: componentPage
	},	

	{
		path: '/demo/img',
		name: 'img',
		component: img
	}
]

export default demoRoute
