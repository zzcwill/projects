车贷贷后项目: cd post-loan-web/src/main/webapp/postloan

模块新增: 投诉管理/风险档案管理/理赔管理

项目构建使用vue-cli
1.npm install vue-cli
2.vue init webpack [文件名]

## Build Setup

# install dependencies
npm install

#development
npm run dev

#production
npm run build

# build for production and view the bundle analyzer report
npm run build --report

输出目录: html --> Modal   js/css -->  dist > static
|-- postloan
|    |-- build 配置文件目录
|        └── webpack.base.conf.js   webpack基础配置
|        └── webpack.dev.conf.js    webpack开发环境配置
|        └── webpack.prod.conf.js   webpack生产环境配置
|    |-- config  配置文件
|    |-- common  公用文件目录(原先模块公用文件目录)
|    |-- dist 打包输出目录
|        |-- static  静态资源目录
|            |-- js  js文件
|            |-- css css文件
|            |-- fonts 其他
|    |-- Modal iframe -> src 地址目录,html 模版编译输出目录
|    |-- src 源文件目录
|        |-- common  公用文件目录
|            |-- js  公用js文件
|                └── iframe.js 封装一些常用的方法
|                └── mockData.js mock模拟数据
|        |-- components  组件,基于element-ui封装的常用组件
|        |-- css   样式文件目录,修改默认样式
|        |-- Modal html引用模版目录  备注: 后期需要新增的模块要基于此目录结构
|           |--  claims 理赔管理模块
|                 |-- claimsList 理赔列表
|                    └── claimsList.html
|                 |-- cliaimsRegister 理赔登记
|                    └── claimsRegister.html
|           |--  complaints 投诉管理模块
|                  |-- complaintsList 投诉列表
|                     └── complaintsList.html
|                  |-- complainRegister 理投诉登记
|                     └── complainRegister.html
|                  |-- complainDeal 投诉处理
|                     └── complainDeal.html
|           |--  riskFile  风险档案模块
|                  |-- riskFileList 风险档案列表
|                      └── riskFileList.html
|                  |-- riskRegister 风险档案登记
|                      └── riskRegister.html
|    └── .babelrc  babel的配置文件
|    └── package.json 项目的基本配置文件
|-- README

####代理设置
postloan/config/index.js

proxyTable: {
  '/api': {
          target: ' http://10.10.13.37:8095',
          changeOrigin: true,
          pathRewrite: {
            '^/api': '/'
          }
        }
}
target 根据服务器地址自行更改
