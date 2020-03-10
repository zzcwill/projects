/**
 * 房间户型信息接口
 */
import request from '@/utils/request'

// 获取每个小区的单元列表
export function getApartmentList(data) {
  return request({
    url: '/api/1.0/base/w301060apartment/list',
    method: 'post',
    data
  })
}

export function addApartment(data, type) {
  return request({
    url: `/api/1.0/base/w301060apartment/${type ? 'modify' : 'append'}`,
    method: 'post',
    data
  })
}

// 删除户型管理
export function del(data) {
  return request({
    url: '/api/1.0/base/w301060apartment/discard',
    method: 'post',
    data
  })
}