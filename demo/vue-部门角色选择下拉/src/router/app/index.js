const appRoute = [
  {
    path: '*',
    redirect: '/404'
  },
	{
    path: '/404',
    redirect: '/userLogin'
	}	
]

export default appRoute
