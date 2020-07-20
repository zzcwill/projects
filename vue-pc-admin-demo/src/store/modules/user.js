import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import personPhoto from '@/assets/common/1.jpg'


const state = {
  token: getToken(),
  userInfo: {},
  name: '',
  avatar: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_INFO: (state, info) => {
    state.userInfo = info
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { account, passWord } = userInfo
    return new Promise((resolve, reject) => {
      login({ account: account.trim(), passWord: passWord }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        let { data } = response

        // 暂时角色不用,先初始化下
        data.roles = ['admin']
        data.avatar = personPhoto
        let { roles, account, avatar } = data
        commit('SET_ROLES', roles)
        commit('SET_NAME', account)
        commit('SET_AVATAR', avatar)
        commit('SET_INFO', data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_ROLES', [])
        commit('SET_NAME', '')
        commit('SET_AVATAR', '')
        commit('SET_TOKEN', '')
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

