import request from '@/utils/request'

export function getFacilityInfo(data){
    return request({
        url:'/api/1.0/base/c211212chargingmachine/list',
        method:'post',
        data
    })
}

export function modifyFacilityInfo(data){
    return request({
        url: '/api/1.0/base/c211212chargingmachine/modify',
        method: 'post',
        data
      })
}

export function discardFacilityInfo(data){
    return request({
        url: '/api/1.0/base/c211212chargingmachine/discard',
        method: 'post',
        data
      })
}

export function appendFacilityInfo(data){
    return request({
        url: '/api/1.0/base/c211212chargingmachine/append',
        method: 'post',
        
        data
      })
  }