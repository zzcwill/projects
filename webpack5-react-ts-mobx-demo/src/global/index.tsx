import React, { useEffect } from 'react'
import {
  Outlet,
  // useLocation,
  // useNavigate
} from 'react-router-dom'
import {
  observer,
} from 'mobx-react-lite'
import { useStore } from '@/hooks'

export default observer(() => {
  // const navigate = useNavigate()
  // const location = useLocation()
  const [{appStore}] = useStore()

  useEffect(() => {
    // console.info(navigate)
    // console.info(location)
    appStore.initAppData()
  }, [])

  if (appStore.appLoading) {
    return (
      <div>loading</div>
    )
  }

  return (
    <Outlet />
  )
})
