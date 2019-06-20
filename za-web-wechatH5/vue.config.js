// const VuxLoader = require('vux-loader')
module.exports = {
  // 默认部署在服务器根目录，不是根目录调整样式
  publicPath: process.env.NODE_ENV === 'production'
    ? '/'
    : '/',
  // 文件打包路径
  outputDir:'dist',
  // 文件打吧路径下的静态资源放置目录
  assetsDir:'',
  // 指定生成的 index.html 的输出路径 (相对于 outputDir)
  indexPath:'index.html',
  // 生成静态资源文件是否加hash命名
  filenameHashing:true,
  // 构建多页面应用，页面的配置
  pages: {
    index: {
      // page 的入口
      entry: 'src/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'test',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  },
  // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码
  lintOnSave: process.env.NODE_ENV !== 'production',
  // vux 相关配置,使用vux-ui
  // configureWebpack: config => {
  //   VuxLoader.merge(config, {
  //       options: {},
  //       plugins: ['vux-ui']
  //   })
  // },  
  // 开发环境服务器设置
  devServer: {
    // 让浏览器 overlay 同时显示警告和错误
    overlay: {
      warnings: true,
      errors: true
    },
    // 端口号
    port: 9091,
    // 配置ip地址
    // host: 'localhost',
    // https:{type:Boolean}
    https: false,
    // 配置自动启动浏览器
    open: true,
    // 配置跨域处理
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://192.168.27.211:8085/',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }, 
      '/mock': {
        target: 'http://192.168.27.11:8080/app/mock/26/',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/mock': ''
        }
      },                 
    },  
  }   

}