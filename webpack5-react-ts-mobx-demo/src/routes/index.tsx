import React from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
import Global from '@/global'
import {
  App,
} from './dynamic-components'

const routes = [
  {
    path: '/',
    element: <Global />,
    children: [
      {
        path: '',
        element: <App />,
        meta: {
          title: 'app',
        },
      },
      {
        path: '*',
        meta: {
          title: '404',
        },
        element: <Navigate to="/" replace />,
      },
    ],
  },
  {
    path: '',
    element: <Navigate to="/" replace />,
  },
]

const Routes = () => {
  const element = useRoutes(routes)
  return element
}


export default Routes
