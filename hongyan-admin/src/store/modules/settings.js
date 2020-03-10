import variables from '@/styles/element-variables.scss'
import defaultSettings from '@/settings'

const { fixedHeader, tagsView, sidebarLogo } = defaultSettings

const state = {
  theme: variables.theme,
  fixedHeader: fixedHeader,
  tagsView: tagsView,
  sidebarLogo: sidebarLogo
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

