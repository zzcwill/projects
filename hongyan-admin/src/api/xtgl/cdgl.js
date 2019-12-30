import request from '@/utils/request'

export function settingInfoList(data) {
    return request({
      url: '/api/1.0/base/s901020menu/list',
      method: 'post',
      data
    })
  }


  export function modifyInfoList(data) {
    return request({
      url: '/api/1.0/base/s901020menu/modify',
      method: 'post',
      data
    })
  }

  export function discardInfoList(data) {
    return request({
      url: '/api/1.0/base/s901020menu/discard',
      method: 'post',
      data
    })
  }

  export function appendInfoList(data) {
    return request({
      url: '/api/1.0/base/s901020menu/append',
      method: 'post',
      data
    })
  }

  export function uploadExcel(data) {
    return request({
      url: '/api/1.0/excel/uploadExcel',
      method: 'post',
      transformRequest: [function(data) {
        return data
      }],
      headers: {
        "Content-type": "multipart/form-data"
      },        
      data
    })
  }