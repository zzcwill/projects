import request from '@/utils/request'

export function  delDoorQx(data) {
  return request({
    url: '/api/1.0/base/r313010door/discard',
    method: 'post',
    data
  })
}

export function  listDoorQx(data) {
  return request({
    url: '/api/1.0/base/r313010door/list',
    method: 'post',
    data
  })
}

export function  editQx(data) {
  return request({
    url: '/api/1.0/mjqx/permission/addPermission',
    method: 'post',
    data
  })
}
