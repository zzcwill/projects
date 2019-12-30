import request from '@/utils/request'

export function getParkList(data) {
  return request({
    url: '/api/1.0/base/w301010park/list',
    method: 'post',
    data
  })
}

export function addPark(data) {
  return request({
    url: '/api/1.0/yqgl/park/append',
    method: 'post',
    data
  })
}

export function getPark(data) {
  return request({
    url: '/api/1.0/base/w301010park/info',
    method: 'post',
    data
  })
}

export function editPark(data) {
  return request({
    url: '/api/1.0/base/w301010park/modify',
    method: 'post',
    data
  })
}

export function listBuilding(data) {
  return request({
    url: '/api/1.0/base/w301020building/list',
    method: 'post',
    data
  })
}

export function delBuilding(data) {
  return request({
    url: '/api/1.0/base/w301020building/discard',
    method: 'post',
    data
  })
}
export function delPark(data) {
  return request({
    url: '/api/1.0/base/w301010park/discard',
    method: 'post',
    data
  })
}

export function addBuilding(data) {
  return request({
    url: '/api/1.0/manager/park/appendBuilding',
    method: 'post',
    data
  })
}

export function editBuilding(data) {
  return request({
    url: '/api/1.0/base/w301020building/modify',
    method: 'post',
    data
  })
}

export function listFloor(data) {
  return request({
    url: '/api/1.0/base/w301030floor/list',
    method: 'post',
    data
  })
}

export function infoFloor(data) {
  return request({
    url: '/api/1.0/base/w301030floor/info',
    method: 'post',
    data
  })
}

export function delFloor(data) {
  return request({
    url: '/api/1.0/yqgl/park/deleteFloor',
    method: 'post',
    data
  })
}

export function addFloor(data) {
  return request({
    url: '/api/1.0/base/w301030floor/append',
    method: 'post',
    data
  })
}

export function editFloor(data) {
  return request({
    url: '/api/1.0/base/w301030floor/modify',
    method: 'post',
    data
  })
}
