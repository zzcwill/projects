import request from '@/utils/request'

export function getCardInfo(data){
    return request({
        url: '/api/1.0/base/u111110playercard/list',
        method: 'post',
        data
      })
}

export function reportTheLoss(data){
  return request({
    url:'/api/1.0/zkgl/cardManage/reportTheLoss',
    method:'post',
    data
  })
}

export function relieve(data){
  return request({
    url:'/api/1.0/zkgl/cardManage/relieve',
    method:'post',
    data
  })
}