
let loginData = { 
  code: 0,
  data: {
    token: 'mock-token'
  }
}

let useInfoData = {
  code: 0,
  data: {
    account: '18042434282'
  }
}

let logoutData = {
  code: 0,
  data: ''
}

export default [
  // user login
  {
    url: '/app/1.0/player/login',
    type: 'post',
    response: _ => {
      return loginData
    }
  },

  // get user info
  {
    url: '/app/1.0/player/home/info',
    type: 'post',
    response: _ => {
      return useInfoData
    }
  },

  // user logout
  {
    url: '/app/1.0/player/logout',
    type: 'post',
    response: _ => {
      return logoutData
    }
  }
]
