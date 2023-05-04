import Mock from 'mockjs'

import user from './user'

const mocks = [
  ...user
]

export function mockXHR() {
  for (const i of mocks) {
    Mock.mock(new RegExp(i.url), i.type || 'get', i.response)
  }
}
