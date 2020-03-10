import request from '@/utils/request'

export function  delQx(data) {
  return request({
    url: '/api/1.0/mjqx/permission/del',
    method: 'post',
    data
  })
}

export function  listQx(data) {
  return request({
    url: '/api/1.0/mjqx/permission/doorAndLiftList',
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

export function  listDevice(data) {
  return request({
    url: '/api/1.0/base/c211210terminalmachine/list',
    method: 'post',
    data
  })
}

export function  editQyQx(data) {
  return request({
    url: '/api/1.0/mjqx/permissionCompany/addPermission',
    method: 'post',
    data
  })
}

export function  listQyQx(data) {
  return request({
    url: '/api/1.0/mjqx/permissionCompany/doorAndLiftList',
    method: 'post',
    data
  })
}

export function  delQyQx(data) {
  return request({
    url: '/api/1.0/mjqx/permissionCompany/del',
    method: 'post',
    data
  })
}
