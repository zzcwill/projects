
let loginData = { 
  code: 0,
  data: {
    token: 'mock-token'
  }
}

let useInfoData = {
  code: 0,
  data: {
    userName: 'admin'
  }
}

let logoutData = {
  code: 0,
  data: ''
}

export default [
  // user login
  {
    url: '/login',
    type: 'post',
    response: _ => {
      return loginData
    }
  },

  // get user info
  {
    url: '/user/session/get',
    type: 'post',
    response: _ => {
      return useInfoData
    }
  },

  // user logout
  {
    url: '/logout',
    type: 'post',
    response: _ => {
      return logoutData
    }
  }
]
