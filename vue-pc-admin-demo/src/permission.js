import router from './router'
import store from './store'
// import { Message } from 'element-ui'
import { getToken, removeToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // set page title
  document.title = getPageTitle(to.meta.title)

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
          removeToken()
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
