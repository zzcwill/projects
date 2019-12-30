const Home = () => import('@/views/app/home/home.vue')
const Login = () => import('@/views/app/login/login.vue')

const appRoute = [
  {
		path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
	{
		path: '/login',
		name: 'Login',
		component: Login
	},   
  {
    path: '*',
    redirect: '/404'
  }
]

export default appRoute