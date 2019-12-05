import { constantRoutes } from '@/router'
import { getRoutes } from '@/api/routes'
import { validatenull } from '@/utils/validate'

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
        const { data } = response

        let dataApi = formatRoutes(data)

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
