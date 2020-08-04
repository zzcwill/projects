export default [
  // user login
  {
    url: '/login',
    type: 'post',
    response: _ => {
      return { 
        code: 10000,
        data: {
          token: 'mock-token'
        }
      }
    }
  },

  // get user info
  {
    url: '/user/session/get',
    type: 'post',
    response: _ => {
      return {
        code: 10000,
        data: {
          realname: 'zzc'
        }
      }
    }
  },

  // user logout
  {
    url: '/logout',
    type: 'post',
    response: _ => {
      return {
        code: 10000,
        data: ''
      }
    }
  }
]
