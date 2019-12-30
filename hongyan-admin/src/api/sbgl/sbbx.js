/**
 * 设备保修接口
 */
import request from '@/utils/request'

// 获取设备保修
export function getList(data) {
  return request({
    url: '/api/1.0/wygl/deviceerror/list',
    method: 'post',
    data
  })
}

// 删除单个设备报修记录
export function del(data) {
  return request({
    url: '/api/1.0/base/w301210ownentry/discard',
    method: 'post',
    data
  })
}

// 新增或编辑报修信息
export function addOrEdit(data) {
  return request({
    url: `/api/1.0/base/p312025deviceerror/modify`,
    method: 'post',
    data
  })
}

// 获取维修人员列表
export function getRepairPeople(data) {
  return request({
    url: '/api/1.0/wygl/deviceerror/list',
    method: 'post',
    data
  })
}

