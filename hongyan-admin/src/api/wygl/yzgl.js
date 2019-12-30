/**
 * 业主管理接口
 */
import request from '@/utils/request'

// // 获取业主列表
export function getList(data) {
  return request({
    url: '/api/1.0/base/w301310owner/list',
    method: 'post',
    data
  })
}

// 删除单个业主信息
export function del(data) {
  return request({
    url: '/api/1.0/base/w301310owner/discard',
    method: 'post',
    data
  })
}

// 新增或编辑入驻信息
export function addOrEdit(data) {
  return request({
    url: `/api/1.0/base/w301310owner/modify`,
    method: 'post',
    data
  })
}

// // 获取房间的树结构  
// export function getRoomTreeData(data, type) {
//   return request({
//     url: `/api/1.0/wygl/park/unit/listParkRoom`,
//     method: 'post',
//     data
//   })
// }