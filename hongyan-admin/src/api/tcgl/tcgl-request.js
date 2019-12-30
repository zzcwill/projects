import request from '@/utils/request'
//----------------------停车位----------------------
//停车位列表分页查询
export function queryParkingList(data) {
  return request({
    url: '/api/1.0/base/p323010parking/list',
    method: 'post',
    data
  })
}
//停车位新增
export function addParking(data) {
  return request({
    url: '/api/1.0/base/p323010parking/append',
    method: 'post',
    data
  })
}
//停车位修改
export function updateParking(data) {
  return request({
    url: '/api/1.0/base/p323010parking/modify',
    method: 'post',
    data
  })
}
//停车位详情查询
export function queryParkingDetail(data) {
  return request({
    url: '/api/1.0/base/p323010parking/info',
    method: 'post',
    data
  })
}
//停车位删除
export function deleteParkingDetail(data) {
  return request({
    url: '/api/1.0/base/p323010parking/discard',
    method: 'post',
    data
  })
}
//----------------------车辆管理----------------------
// 新增车辆信息
export function addCarInfo(data) {
  return request({
    url: '/api/1.0/base/p323020car/append',
    method: 'post',
    data
  })
}

// 车辆列表分页查询
export function queryCarInfoList(data) {
  return request({
    url: '/api/1.0/base/p323020car/list',
    method: 'post',
    data
  })
}

// 车辆信息详情查询
export function queryCarInfoDetail(data) {
  return request({
    url: '/api/1.0/base/p323020car/info',
    method: 'post',
    data
  })
}

// 车辆信息修改
export function updateCarInfo(data) {
  return request({
    url: '/api/1.0/base/p323020car/modify',
    method: 'post',
    data
  })
}

// 车辆信息删除
export function deleteCarInfo(data) {
  return request({
    url: '/api/1.0/base/p323020car/discard',
    method: 'post',
    data
  })
}

//----------------------停车预约----------------------
// 停车预约列表分页查询
export function queryCarAppointmentList(data) {
  return request({
    url: '/api/1.0/base/p323030carorder/list',
    method: 'post',
    data
  })
}

// 新增车辆预约信息
export function addCarAppointment(data) {
  return request({
    url: '/api/1.0/tcgl/carorder/order',
    method: 'post',
    data
  })
}

// 查询车辆预约信息详情
export function queryAppointmentDetail(data) {
  return request({
    url: '/api/1.0/base/p323030carorder/info',
    method: 'post',
    data
  })
}

// 删除查询车辆预约信息
export function deleteAppointment(data) {
  return request({
    url: '/api/1.0/base/p323030carorder/discard',
    method: 'post',
    data
  })
}

// 更新查询车辆预约信息
export function updateAppointment(data) {
  return request({
    url: 'api/1.0/base/p323030carorder/modify',
    method: 'post',
    data
  })
}
// 停车预约审核
export function doPassAppointment(data) {
  return request({
    url: 'api/1.0/tcgl/carorder/check',
    method: 'post',
    data
  })
}

