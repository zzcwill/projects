import request from '@/utils/request'

  export function InfoList(data) {
    return request({
      url: '/api/1.0/base/s901030page/list',
      method: 'post',
      data
    })
  }

  export function modifyInfoList(data) {
    return request({
      url: '/api/1.0/base/s901030page/modify',
      method: 'post',
      data
    })
  }

  export function appendInfoList(data) {
    return request({
      url: '/api/1.0/base/s901030page/append',
      method: 'post',
      data
    })
  }

  export function discardInfoList(data) {
    return request({
      url: '/api/1.0/base/s901030page/discard',
      method: 'post',
      data
    })
  }

  export function userMenu(){
    return request({
      url:'/api/1.0/user/menu',
      method:'post'
    })
  }

  export function pageBtn(data){
    return request({
      url:'/api/1.0/base/s901040pagefunc/list',
      method:'post',
      data
    })
  }

  export function pageBtnModify(data){
    return request({
      url:'/api/1.0/base/s901040pagefunc/modify',
      method:'post',
      data
    })
  }

  export function pageBtnDisCard(data){
    return request({
      url:'/api/1.0/base/s901040pagefunc/discard',
      method:'post',
      data
    })
  }

  pageBtnAppend
  export function pageBtnAppend(data){
    return request({
      url:'/api/1.0/base/s901040pagefunc/append',
      method:'post',
      data
    })
  }