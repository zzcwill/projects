### post-demo
export function login(data) {
  return request({
    url: '/api/1.0/manager/login',
    method: 'post',
    data
  })
}

### get-demo
export function getInfo(token) {
  return request({
    url: '/api/1.0/manager/home/info',
    method: 'get',
    params: { token }
  })
}