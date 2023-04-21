import React, { useEffect } from 'react'
import {
  Outlet,
  // useLocation,
  // useNavigate
} from 'react-router-dom'
import {
  observer,
  Provider,
  useLocalStore,
} from 'mobx-react'
import Store from '@/stores'

export default observer(() => {
  // const navigate = useNavigate()
  // const location = useLocation()
  const store = useLocalStore(() => new Store())

  useEffect(() => {
    // console.info(navigate)
    // console.info(location)
    store.appStore.initAppData()
  }, [])

  return (
    <Provider rootStore={store}>
      <Outlet />
    </Provider>
  )
})
