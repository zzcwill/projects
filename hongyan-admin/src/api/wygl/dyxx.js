/**
 * 单元信息页面接口
 */
import request from '@/utils/request'

// 获取每个小区的单元列表
export function getFloorList(data) {
  return request({
    url: '/api/1.0/wygl/building/list',
    method: 'post',
    data
  })
}

// 获取楼栋单元信息
export function getUnitListApi(data) {
  return request({
    url: '/api/1.0/base/w301050unit/list',
    method: 'post',
    data
  })
}

// 新增单元
export function addFloorList(data, type) {
  return request({
    url: `/api/1.0/base/w301050unit/${type ? 'modify' : 'append'}`,
    method: 'post',
    data
  })
}

// 删除单元
export function delFloorList(data) {
  return request({
    url: '/api/1.0/base/w301050unit/discard',
    method: 'post',
    data
  })
}