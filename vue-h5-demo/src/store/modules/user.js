import { topicsApi } from '@/api/user'

const user = {
  state: {
    userInfo: '',
  },

  mutations: {
    user_info: (state, userData) => {
      state.userInfo = userData
    },
  },

  actions: {
    //设置用户信息
    async user_info ({ commit }, userData) {
      let res = await topicsApi(userData)
      res = {
        username: 'zzc',
        phone: '18042434280',
        token: '123456'
      }
      let userInfoStr = JSON.stringify(res)
      commit('user_info', userInfoStr)
      return res
    }       
  }
}

export default user
