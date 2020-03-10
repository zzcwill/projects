import request from '@/utils/request'

export function listAttendance(data) {
  return request({
    url: '/api/1.0/base/c202010attendance/list',
    method: 'post',
    data
  })
}

export function infoAttendance(data) {
  return request({
    url: '/api/1.0/base/c202010attendance/info',
    method: 'post',
    data
  })
}

export function addAttendance(data) {
  return request({
    url: '/api/1.0/base/c202010attendance/append',
    method: 'post',
    data
  })
}

export function editAttendance(data) {
  return request({
    url: '/api/1.0/base/c202010attendance/modify',
    method: 'post',
    data
  })
}

export function delAttendance(data) {
  return request({
    url: '/api/1.0/base/c202010attendance/discard',
    method: 'post',
    data
  })
}

export function exportExcel(data) {
  return request({
    url: '/api/1.0/qygl/attendance/export',
    method: 'post',
    responseType: 'blob',
    data
  })
}

