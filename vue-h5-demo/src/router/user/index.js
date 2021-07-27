const login = () => import('@/views/user/login.vue')

const userRoute = [
	{
		path: '/login',
		name: 'login',
		component: login
	}		
]

export default userRoute
