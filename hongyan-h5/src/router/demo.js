const Demo1 = () => import('@/views/demo/demo1/index.vue')
const Page1 = () => import('@/views/demo/page1/index.vue')

const appRoute = [
  {
		path: '/demo/demo1',
		name: 'DemoDemo1',
		component: Demo1
	},
  {
		path: '/demo/page1',
		name: 'page1',
		component: Page1
	}	
]

export default appRoute