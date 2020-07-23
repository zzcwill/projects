import { constantRoutes } from '@/router'
import { getRoutes } from '@/api/common'
import { trunRouteName, trunRouteName2, trunRoutePath,validatenull } from '@/utils/config'
// 模拟菜单返回数组，先前端处理，后期后端菜单配置好
import { asyncRoutes } from '@mock/routes/routes'

// 对接口返回的路由做处理
export const getApiRoutes = (apiData) => {
  const aRouter = []
  apiData.forEach(oneMenu => {
    let {
      menuName,
      menuPicUrl,
      menuUrl,
      menuLevel,
      nextSubs
    } = oneMenu

    let noNextSubs = validatenull(nextSubs)
    let isMenuLevelOne = menuLevel === '1'

    let path = isMenuLevelOne ? menuUrl : trunRoutePath(menuUrl)
    let component = isMenuLevelOne ? 'layout/index' : `views${menuUrl}/index`

    let name = isMenuLevelOne ? trunRouteName(menuUrl) : trunRouteName2(menuUrl)

    let meta = {
      title: menuName,
      icon: validatenull(menuPicUrl) ? '' : menuPicUrl
    }

    if (!isMenuLevelOne) {
      delete meta.icon
    }

    if (!(noNextSubs && isMenuLevelOne)) {
        let oRouter = {
          path: path,
          component: component,
          name: name,
          meta: meta,
          children: validatenull(nextSubs) ? [] : getApiRoutes(nextSubs)
        }
        aRouter.push(oRouter)
    }
  })

  return aRouter
}
export const formatRoutes = (aMenu) => {
  const aRouter = []
  aMenu.forEach(oMenu => {
    const {
      path,
      component,
      name,
      meta,
      redirect,
      children
    } = oMenu

    const oRouter = {
      path: path,
      component: () => import(`../../${component}.vue`),
      redirect: redirect,
      name: name,
      meta: meta,
      children: validatenull(children) ? [] : formatRoutes(children)
    }
    if (oRouter.children.length === 0) {
      delete oRouter.children
    }
    aRouter.push(oRouter)
  })

  aRouter.push(
    { path: '*', redirect: '/nopage', hidden: true }
  )

  return aRouter
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }) {
    return new Promise((resolve, reject) => {
      getRoutes().then(response => {
        let { data } = response

        // 模拟接口返回对象
        data = asyncRoutes
        let data2 = getApiRoutes(data)
        // console.info(constantRoutes)
        // console.info(data2)
        let dataApi = formatRoutes(data2)

        commit('SET_ROUTES', dataApi)
        resolve(dataApi)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
