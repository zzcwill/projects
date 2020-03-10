/**
 * 施工管理接口
 */
import request from '@/utils/request'

// 获取施工管理列表数据
export function getList(data) {
  return request({
    url: '/api/1.0/wygl/construction/list',
    method: 'post',
    data
  })
}

// 删除单个施工管理
export function del(data) {
  return request({
    url: '/api/1.0/base/p32a010construction/discard',
    method: 'post',
    data
  })
}

// 新增或编辑施工管理
export function addOrEdit(data, type = 'append') {
  return request({
    url: `/api/1.0/base/p32a010construction/${type}`,
    method: 'post',
    data
  })
}

// 获取四级联动选择项
export function selectList(data) {
  return request({
    url: `/api/1.0/wygl/construction/area/selectList`,
    method: 'post',
    data
  })
}
