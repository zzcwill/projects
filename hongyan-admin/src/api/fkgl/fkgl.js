import request from '@/utils/request'

// 来访预约列表分页查询
export function queryVisitorAppointmentList(data) {
  return request({
    url: '/api/1.0/base/r3a1010visitor/list',
    method: 'post',
    data
  })
}

// 来访预约通过
export function passVisitorAppointment(data) {
  return request({
    url: '/api/1.0/fkgl/visitor/pass',
    method: 'post',
    data
  })
}

// 来访预约拒绝
export function refuseVisitorAppointment(data) {
  return request({
    url: '/api/1.0/fkgl/visitor/noPass',
    method: 'post',
    data
  })
}

// 来访预约登记
export function addVisitorAppointment(data) {
  return request({
    url: '/api/1.0/fkgl/visitor/order',
    method: 'post',
    data
  })
}

// 预约访客随行人员查询
export function queryVisitorRetinueList(data) {
  return request({
    url: '/api/1.0/common/search/visitor',
    method: 'post',
    data
  })
}
// 预约访客随行车辆查询
export function queryVisitorCarList(data) {
  return request({
    url: '/api/1.0/common/search/visitorCar',
    method: 'post',
    data
  })
}
