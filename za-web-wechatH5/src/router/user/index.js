const UserLogin = () => import('@/views/user/UserLogin.vue')
const Wechatindex = () => import('@/views/user/Wechatindex.vue')
const BindOk = () => import('@/views/user/BindOk.vue')

const userRoute = [
  {
		path: '/',
		redirect: '/userLogin'
	},
	{
		path: '/userLogin',
		name: 'userLogin',
		component: UserLogin
	},
	{
		path: '/wechatindex',
		name: 'wechatindex',
		component: Wechatindex
	},
	{
		path: '/bindOk',
		name: 'bindOk',
		component: BindOk
	},		
]

export default userRoute
