const UserLogin = () => import('@/views/user/UserLogin.vue')

const userRoute = [
  {
		path: '/',
		redirect: '/userLogin'
	},
	{
		path: '/userLogin',
		name: 'userLogin',
		component: UserLogin
	}		
]

export default userRoute
