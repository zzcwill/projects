import React, { useEffect } from 'react'
import {
  Outlet,
  // useLocation,
  // useNavigate
} from 'react-router-dom'
import { observer } from 'mobx-react'
import { useStore } from '@/hooks'

export default observer(() => {
  const [{ appStore }] = useStore()
  // console.info(appStore.userInfo)
  // const navigate = useNavigate()
  // const location = useLocation()



  useEffect(() => {
    // console.log('NODE_ENV', process.env.NODE_ENV)
    // console.log('BASE_ENV', process.env.BASE_ENV)
    // console.info(navigate)
    // console.info(location)
    // appStore.getUserInfo()
  }, [])

  return <Outlet />
})
