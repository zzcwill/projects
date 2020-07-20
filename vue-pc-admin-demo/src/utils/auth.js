import Cookies from 'js-cookie'

const csurfToken = 'csurfToken'

export function getToken() {
  return Cookies.get(csurfToken)
}

export function setToken(token) {
  return Cookies.set(csurfToken, token)
}

export function removeToken() {
  return Cookies.remove(csurfToken)
}
