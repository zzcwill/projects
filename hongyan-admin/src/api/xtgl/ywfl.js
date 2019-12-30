import request from '@/utils/request'

  export function InfoList(data) {
    return request({
      url: '/api/1.0/base/s901050classify/list',
      method: 'post',
      data
    })
  }

  export function modifyInfoList(data) {
    return request({
      url: '/api/1.0/base/s901050classify/modify',
      method: 'post',
      data
    })
  }

  export function appendInfoList(data) {
    return request({
      url: '/api/1.0/base/s901050classify/append',
      method: 'post',
      data
    })
  }

  export function discardInfoList(data) {
    return request({
      url: '/api/1.0/base/s901050classify/discard',
      method: 'post',
      data
    })
  }


  
