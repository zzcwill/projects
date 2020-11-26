const userLogin = () => import('@/views/user/userLogin.vue')

const userRoute = [
  {
		path: '/',
		redirect: '/chartDemo'
	},
	{
		path: '/userLogin',
		name: 'userLogin',
		component: userLogin
	}		
]

export default userRoute
