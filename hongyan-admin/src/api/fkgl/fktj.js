import request from '@/utils/request'

export function numVisitor(data) {
  return request({
    url: '/api/1.0/fkgl/visitor/statisticsNum',
    method: 'post',
    data
  })
}

export function numVisitorPie(data) {
  return request({
    url: '/api/1.0/fkgl/visitor/visitType',
    method: 'post',
    data
  })
}

export function listVisitorMonth(data) {
  return request({
    url: '/api/1.0/fkgl/visitor/list',
    method: 'post',
    data
  })
}

export function listVisitor(data) {
  return request({
    url: '/api/1.0/fkgl/visitor/listByPark',
    method: 'post',
    data
  })
}
