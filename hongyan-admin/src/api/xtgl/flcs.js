import request from '@/utils/request'

export function settingInfoList(data) {
    return request({
      url: '/api/1.0/base/s901020menu/list',
      method: 'post',
      data
    })
  }