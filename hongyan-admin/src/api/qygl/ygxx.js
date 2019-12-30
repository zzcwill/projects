import request from '@/utils/request'

export function employeeList(data) {
  return request({
    url: '/api/1.0/base/c201030employee/list',
    method: 'post',
    data
  })
}

export function employeeInfo(data) {
  return request({
    url: '/api/1.0/base/c201030employee/info',
    method: 'post',
    data
  })
}

export function addEmployee(data) {
  return request({
    url: '/api/1.0/base/c201030employee/append',
    method: 'post',
    data
  })
}

export function editEmployee(data) {
  return request({
    url: '/api/1.0/base/c201030employee/modify',
    method: 'post',
    data
  })
}

export function delEmployee(data) {
  return request({
    url: '/api/1.0/base/c201030employee/discard',
    method: 'post',
    data
  })
}
