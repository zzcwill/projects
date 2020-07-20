import router from './router'
import store from './store'
// import { Message } from 'element-ui'
import { getToken, setToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // set page title
  document.title = getPageTitle(to.meta.title)

  //有token自动登录
  if (to.query.token) {
    setToken(to.query.token)
    store.commit('user/SET_TOKEN', to.query.token)
  }

  // determine whether the user has logged in
  const hasToken = getToken()
  
  // console.info(to.path)

  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      const userInfo = store.getters.userInfo
      if (userInfo) {
        next()
      } else {
        try {
          await store.dispatch('user/getInfo')

          const accessRoutes = await store.dispatch('permission/generateRoutes')
          
          router.addRoutes(accessRoutes)

          next({ ...to, replace: true })
        } catch (error) {
          await store.dispatch('user/resetToken')
          next(`/login?redirect=${to.path}`)
        }
      }
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
