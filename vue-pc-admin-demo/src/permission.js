import router from './router'
import store from './store'
// import { Message } from 'element-ui'
import { getToken, setToken, setShowNav } from '@/utils/auth' // get token from cookie
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

  //nav 1 显示,0 隐藏
  if (to.query.nav) {
    setShowNav(to.query.nav)
  } else {
    setShowNav('1')
  }

  // determine whether the user has logged in
  const hasToken = getToken()
  
  console.info(to.path)

  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          const { roles } = await store.dispatch('user/getInfo')

          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
          
          router.addRoutes(accessRoutes)

          next({ ...to, replace: true })
        } catch (error) {
          await store.dispatch('user/resetToken')
          //这里改去提示页面
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
