import { asyncRoutes } from './routes.js'

export default [
  // mock get all routes form server
  {
    url: '/za/menu/list',
    type: 'post',
    response: _ => {
      return {
        code: 10000,
        data: asyncRoutes
      }
    }
  }
]
