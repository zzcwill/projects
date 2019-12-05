
const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    avatar: '/1.jpg',
    name: 'admin'
  },
  'editor-token': {
    roles: ['editor'],
    avatar: '/1.jpg',
    name: 'editor'
  }
}

export default [
  // user login
  {
    url: '/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          code: 20000,
          message: '账户不正确'
        }
      }

      return {
        code: 10000,
        data: token
      }
    }
  },

  // get user info
  {
    url: '/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 20000,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 10000,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 10000,
        data: 'success'
      }
    }
  }
]
