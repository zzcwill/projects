
import request from '@/utils/request'

// 查询企业信息id
export function enterpriseInfo(data){
    return request({
        url: '/api/1.0/base/w832020define/info',
        method: 'post',
        data
      })
}

// 企业详情
export function companyDetails(data){
    return request({
        url: '/api/1.0/base/c201010partner/info',
        method: 'post',
        data
      })
}


export function modelList(data){
    return request({
        url: '/api/1.0/base/s832010model/list',
        method: 'post',
        data
      })
}

// 栏目列表

export function columnList(data){
    return request({
        url:'api/1.0/base/r70z0x0category/list',
        method:'post',
        data
    })
}

export function appendColumnList(data){
    return request({
        url:'api/1.0/base/r70z0x0category/append',
        method:'post',
        data
    })
}

export function discardList(data){
    return request({
        url:'api/1.0/base/r70z0x0category/discard',
        method:'post',
        data
    })
}

// 文章动态

export function articleList(data){
    return request({
        url:'/web/1.0/home/material/selectMaterialList',
        method:'post',
        data
    })
}

// 删除文章

export function deleteArtical(data){
    return request({
        url:'/web/1.0/home/material/delete',
        method:'post',
        data
    })
}

// 编辑文章

export function editArtical(data){
    return request({
        url:'/api/1.0/base/r702010material/modify',
        method:'post',
        data
    })
}

export function addArtical(data){
    return request({
        url:'/web/1.0/home/material/append',
        method:'post',
        data
    })
}

// 文章动态类别列表
export function addArticalList(){
    return request({
        url:'/api/1.0/base/r70z0x0category/list',
        method:'post'
    })
}


