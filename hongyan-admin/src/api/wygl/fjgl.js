/**
 * 房间管理信息接口
 */
import request from '@/utils/request'

// 获取每个小区的单元列表
export function getFloorList(data) {
  return request({
    url: '/api/1.0/wygl/park/unit/listParkUnit',
    method: 'post',
    data
  })
}

// 获取园区楼栋楼层
export function getListParkFloor(data) {
  return request({
    url: '/api/1.0/wygl/park/unit/listParkFloor',
    method: 'post',
    data
  })
}

// 获取每个小区的房间
export function getList(data) {
  return request({
    url: '/api/1.0/base/w301070room/list',
    method: 'post',
    data
  })
}

// 删除每个楼栋的房间
export function del(data) {
  return request({
    url: '/api/1.0/base/w301070room/discard',
    method: 'post',
    data
  })
}

// 编辑每个楼栋的房间
export function addOrEdit(data, type) {
  return request({
    url: `/api/1.0/base/w301070room/${type ? 'modify' : 'append'}`,
    method: 'post',
    data
  })
}

// 获取楼层
export function getFloorListItem(data) {
  return request({
    url: '/api/1.0/base/w301030floor/list',
    method: 'post',
    data
  })
}

// 获取单元
export function getUnitListItem(data) {
  return request({
    url: '/api/1.0/base/w301050unit/list',
    method: 'post',
    data
  })
}