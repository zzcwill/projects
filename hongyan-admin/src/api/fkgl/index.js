import request from '@/utils/request'

export function info(data){
    return request({
        url: '/api/1.0/base/u111110playercard/list',
        // url: '/api/1.0/zkgl/cardManage/readCard',
        method: 'post',
        data
      })
}

// 发卡接口
export function append(data){
  return request({
      url: '/api/1.0/zkgl/cardManage/append',
      method: 'post',
      data
    })
}

export function readCard(data){
  return request({
      url: '/api/1.0/zkgl/cardManage/readCard',
      method: 'post',
      data
    })
}