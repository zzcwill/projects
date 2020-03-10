/**
 * 收费项目接口
 */
import request from '@/utils/request'

export function apiSFXM(data, type = 'list') {
  return request({
    url: `/api/1.0/base/w301390chargeitem/${type}`,
    method: 'post',
    data
  })
}
