import { asyncRoutes } from './routes.js'

export default [
  // mock get all routes form server
  {
    url: '/api/1.0/manager/home/menu',
    type: 'post',
    response: _ => {
      return {
        code: 0,
        data: asyncRoutes
      }
    }
  }
]
