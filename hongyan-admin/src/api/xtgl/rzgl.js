import request from '@/utils/request'

export function getListInfo(data) {
    return request({
      url: '/api/1.0/base/l908010managerlogin/list',
      method: 'post',
      data
    })
  }