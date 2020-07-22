import router from './router'
import store from './store'
// import { Message } from 'element-ui'
import { getToken, removeToken } from '@/utils/config' // get token from cookie

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  //console.info(to.path)
  // document.title = to.meta.title
  document.title = 'zzc-admin'

  const hasToken = getToken()

  if(!hasToken) {       
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } 
    if (whiteList.indexOf(to.path) === -1) {
      if (to.path.indexOf('/redirect') !== -1) {
        next({ path: '/login' })
      } 
      if (to.path === '/nopage') {
        next({ path: '/login' })
      } 
      if (to.path === '/nopc') {
        next({ path: '/login' })
      }      
      if (to.path.indexOf('/redirect') === -1) {
        if (to.path !== '/nopc') {
          if (to.path !== '/nopage') {
            next(`/login?redirect=${to.path}`)
          }
        } 
      }
    }    
  }
 
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
    } 
    
    if (to.path !== '/login') {
      const userInfo = store.getters.userInfo
      if (userInfo) {
        next()
      } 
      if (!userInfo) {
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
  }
})

router.afterEach(() => {

})
