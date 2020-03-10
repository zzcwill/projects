/**
 * 投诉建议
 */
import request from '@/utils/request'

// 获取列表
export function getList(data) {
  return request({
    url: '/api/1.0/base/p32a020propose/list',
    method: 'post',
    data
  })
}

// 新增或编辑
export function addOrEdit(data) {
  return request({
    url: `/api/1.0/base/p32a020propose/modify`,
    method: 'post',
    data
  })
}