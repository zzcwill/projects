import request from '@/utils/request'

  export function InfoList(data) {
    return request({
      url: '/api/1.0/base/s901090dic/list',
      method: 'post',
      data
    })
  }

  export function modifyInfoList(data) {
    return request({
      url: '/api/1.0/base/s901090dic/modify',
      method: 'post',
      data
    })
  }

  export function appendInfoList(data) {
    return request({
      url: '/api/1.0/base/s901090dic/append',
      method: 'post',
      data
    })
  }

  export function discardInfoList(data) {
    return request({
      url: '/api/1.0/base/s901090dic/discard',
      method: 'post',
      data
    })
  }


  export function parameterList() {
    return request({
      url: '/api/1.0/xtgl/dic/dicList',
      method: 'post'
    })
  }