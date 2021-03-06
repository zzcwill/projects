const { createProxyMiddleware } = require('http-proxy-middleware')


module.exports = function(app) {

  if (process.env.REACT_APP_BASE_API !== '/mock') {
    app.use(
      process.env.REACT_APP_BASE_API,
      createProxyMiddleware({
        target: process.env.REACT_APP_SERVICE,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.REACT_APP_BASE_API]: ''
        }         
      })
    );
  }

  // app.use(
  //   '/mock',
  //   createProxyMiddleware({
  //     target: 'https://cnodejs.org/api/v1',
  //     changeOrigin: true,
  //     pathRewrite: {
  //       '^/mock': ''
  //     }         
  //   })
  // );  
};