import request from '@/utils/request'

export function getAreaList(data) {
  return request({
    url: '/api/1.0/base/w301040area/list',
    method: 'post',
    data
  })
}

export function closeqystate(data) {
  return request({
    url: '/api/1.0/base/w301040area/modify',
    method: 'post',
    data
  })
}

export function addArea(data) {
  return request({
    url: '/api/1.0/base/w301040area/append',
    method: 'post',
    data
  })
}

export function getArea(data) {
  return request({
    url: '/api/1.0/base/w301040area/info',
    method: 'post',
    data
  })
}
export function editArea(data) {
  return request({
    url: '/api/1.0/base/w301040area/modify',
    method: 'post',
    data
  })
}
