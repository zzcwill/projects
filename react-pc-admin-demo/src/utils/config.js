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