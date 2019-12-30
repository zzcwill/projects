import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/app/1.0/player/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/app/1.0/player/home/info',
    method: 'post'
  })
}

export function logout() {
  return request({
    url: '/app/1.0/player/logout',
    method: 'post'
  })
}
