import router from './router'
import { getToken, setToken } from '@/utils/auth' // get token from cookie
import { getInfo } from '@/api/user'
import { cacheData } from '@/global'
import { judgeObjectNull } from '@/utils'

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {

  if(to.query.token) {
    setToken(to.query.token)
  }

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      //没用户信息去获取用户信息
      if(judgeObjectNull(cacheData.user)) {
        let userInfo = await getInfo()
        cacheData.user = userInfo.data
      }
      next()     
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
})

router.afterEach(() => {
})
