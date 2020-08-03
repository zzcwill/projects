export default {
  login: (config) => {
    return {
      code: 10000,
      data: {
        token: 'admin-token',
      }
    };
  },
  userInfo: (config) => {
    return {
      code: 10000,
      data: {
        id: "admin",
        role: "admin",
        name: "zzcwill",        
      },
    };
  },
  logout: (_) => {
    return {
      code: 10000,
      data: "success",
    };
  },
};
