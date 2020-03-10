 import request from '@/utils/request'

export function getCardInfo(data){
    return request({
        url: '/api/1.0/base/u111110playercard/list',
        method: 'post',
        data
      })
}



export function withdrawCard(data){
    return request({
        url:'/api/1.0/zkgl/cardManage/withdrawCard',
        method:'post',
        data
    })
}


export function readCard(data){
    return request({
        url: '/api/1.0/zkgl/cardManage/readCard',
        method:'post',
        data
    })
}

export function patchCard(data){
    return request({
        url:'/api/1.0/zkgl/cardManage/patchCard',
        method:'post',
        data
    })
}

// 销毁卡片

export function destruction(data){
    return request({
        url:'/api/1.0/zkgl/cardManage/destruction',
        method:'post',
        data
    })
}