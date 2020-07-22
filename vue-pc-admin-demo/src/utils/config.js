//管理后台初始化方法

//token相关
import Cookies from 'js-cookie'

const tokenName = 'token'

export function getToken() {
  return Cookies.get(tokenName)
}
export function setToken(token) {
  return Cookies.set(tokenName, token)
}
export function removeToken() {
  return Cookies.remove(tokenName)
}

//动态路由-name转换
export function trunRouteName(str) {
	let arr = str.split('')
	arr.shift()
	// arr[0] = arr[0].toUpperCase()
	return arr.join('')
}  
export function trunRouteName2(str) {
	let arr = str.split('/')
	let str2 = arr[1]
	let arr2 = str2.split('')
	// arr2[0] = arr2[0].toUpperCase()

	let str3 = arr[2]
	let arr3 = str3.split('')
	arr3[0] = arr3[0].toUpperCase()	

	let str4 = arr2.join('') + arr3.join('')
	return str4
} 
export function trunRoutePath(str) {
	let arr = str.split('/')
	let str2 = arr[arr.length - 1]
	return str2
}

//是否手机端访问
export function judgeMobile() {
	var isMobile = /Android|Windows Phone|iPhone|iPod/i.test(navigator.userAgent)
	return isMobile
}

// 检验对象是否为空
export function validatenull(val) {
  if (val instanceof Array) {
    if (val.length === 0) return true
  } else if (val instanceof Object) {
    if (JSON.stringify(val) === '{}') return true
  } else {
    if (val === 'null' || val == null || val === 'undefined' || val === undefined || val === '') return true
    return false
  }
  return false
}

//是否外部访问地址
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}