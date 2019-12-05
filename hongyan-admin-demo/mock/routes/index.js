import { asyncRoutes } from './routes.js'

export default [
  // mock get all routes form server
  {
    url: '/routes',
    type: 'get',
    response: _ => {
      return {
        code: 10000,
        data: asyncRoutes
      }
    }
  }
]
