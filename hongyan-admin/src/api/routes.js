import request from '@/utils/request'

export function getRoutes() {
  return request({
    url: '/api/1.0/manager/home/menu',
    method: 'post'
  })
}
