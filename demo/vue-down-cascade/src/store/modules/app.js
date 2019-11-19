const app = {
  state: {
    language: 'zh',
  },

  mutations: {
    set_app_language: (state, language) => {
        state.language = language
    }  
  },

  actions: {
    set_app_language({ commit }, lan) {
      commit('set_app_language', lan)
    }    
  }
}

export default app
