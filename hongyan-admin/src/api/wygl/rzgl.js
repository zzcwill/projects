/**
 * 入驻管理接口
 */
import request from '@/utils/request'

// 获取每个小区的房间
export function getList(data) {
  return request({
    url: '/api/1.0/base/w301210ownentry/list',
    method: 'post',
    data
  })
}

// 删除单个入驻信息
export function del(data) {
  return request({
    url: '/api/1.0/base/w301210ownentry/discard',
    method: 'post',
    data
  })
}

// 新增或编辑入驻信息
export function addOrEdit(data, type) {
  return request({
    url: `/api/1.0/base/w301210ownentry/${type ? 'modify' : 'append'}`,
    method: 'post',
    data
  })
}

// 获取房间的树结构  
export function getRoomTreeData(data) {
  return request({
    url: `/api/1.0/wygl/park/unit/listParkRoom`,
    method: 'post',
    data
  })
}