const app = {
  state: {
    sysname: 'app',
  },

  mutations: {
    app_sysname: (state, sysname) => {
        state.sysname = sysname
    }  
  },

  actions: {
    app_sysname({ commit }, sysname) {
      commit('app_sysname', sysname)
    }    
  }
}

export default app
