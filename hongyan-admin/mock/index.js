import Mock from 'mockjs'

import user from './user'
import routes from './routes'

const mocks = [
  ...user,
  ...routes,
]

export function mockXHR() {
  for (const i of mocks) {
    Mock.mock(new RegExp(i.url), i.type || 'get', i.response)
  }
}
