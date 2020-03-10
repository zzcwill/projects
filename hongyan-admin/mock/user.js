
let loginData = { 
  code: 0,
  data: {
    token: 'mock-token'
  }
}

let useInfoData = {
  code: 0,
  data: {
    account: 'admin'
  }
}

let logoutData = {
  code: 0,
  data: ''
}

export default [
  // user login
  {
    url: '/api/1.0/manager/login',
    type: 'post',
    response: _ => {
      return loginData
    }
  },

  // get user info
  {
    url: '/api/1.0/manager/home/info',
    type: 'post',
    response: _ => {
      return useInfoData
    }
  },

  // user logout
  {
    url: 'api/1.0/manager/logout',
    type: 'post',
    response: _ => {
      return logoutData
    }
  }
]
