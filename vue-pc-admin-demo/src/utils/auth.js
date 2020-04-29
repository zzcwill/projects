import Cookies from 'js-cookie'

const TokenKey = 'hongyan-token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

//菜单和顶部栏是否显示
const showNav = 'showNav'

export function getShowNav() {
  return Cookies.get(showNav)
}

export function setShowNav(token) {
  return Cookies.set(showNav, token)
}

export function removeShowNav() {
  return Cookies.remove(showNav)
}
