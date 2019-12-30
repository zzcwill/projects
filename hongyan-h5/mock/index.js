import Mock from 'mockjs'

import user from './user'

const mocks = [
  ...user
]

Mock.setup({
  timeout: 300, // 设置延迟响应，模拟向后端请求数据
})

export function mockXHR() {
  for (let i of mocks) {
    Mock.mock(`${process.env.VUE_APP_BASE_API}${i.url}`,  i.type ||'get', i.response)
  }
}
