const appRoute = [
  {
		path: '/',
		redirect: '/demo'
	},
	{
    path: '/404',
    redirect: '/demo'
	},    
  {
    path: '*',
    redirect: '/404'
  }
]

export default appRoute
