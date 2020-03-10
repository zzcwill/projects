import request from '@/utils/request'

export function InfoList(data) {
    return request({
      url: '/api/1.0/base/s901060parameter/list',
      method: 'post',
      data
    })
  }

  export function modifyInfoList(data) {
    return request({
      url: '/api/1.0/base/s901060parameter/modify',
      method: 'post',
      data
    })
  }

  export function appendInfoList(data) {
    return request({
      url: '/api/1.0/base/s901060parameter/append',
      method: 'post',
      data
    })
  }

  export function discardInfoList(data) {
    return request({
      url: '/api/1.0/base/s901060parameter/discard',
      method: 'post',
      data
    })
  }

  export function parameterList() {
    return request({
      url: '/api/1.0/xtgl/parameter/parameterList',
      method: 'post'
    })
  }

