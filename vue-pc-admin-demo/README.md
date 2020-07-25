# vue-admin
> A vue-admin
基于 vue-admin-template项目改造的后台管理模板

### 命名规范
##### 命名规则：尽量简洁明了,尽量用英文（有道词典用起来），除了菜单路由和菜单文件夹是按中文名首字母命名（例如 系统管理 xtgl）
- 项目命名： 一律中线分割(例如 zzc-admin )
- 文件夹命名： 小驼峰形式命名(例如 apiData)
- 文件命名
  - vue组件文件命名：大驼峰式命名法（例如CamelCase.vue），且组件name值需要和文件名一致
	- vue页面文件名：小驼峰形式命名（例如indexApi.vue)
  - js,css，img文件命名： 小驼峰形式命名(例如 apiData)

##### js规范
- js 命名的变量及方法名尽量采用小驼峰形式命名( 如 countDown)
- js 字符串变量都有单引号，如遇到单双引号嵌套
（如 `There are <b>${basket.count}</b> items`）
- js 方法和变量写完不加分号（;）
- js中 = ,() ,+ ,- 需要与变量分开（ 例如  a = b + c ）
- js中 冒号(：)左边不空格，右边要空格（例如 a: 3）
- js尽量使用 es6语法，定义方法用箭头函数
- import 进来的变量名如果是包的话尽量大写(import Router from 'vue-router')
- js中，分隔符，左边不空格，右边一空格（ import { login, getInfo } from 'api'）

##### html规范
- html标签变量都用双引号
- 尽量不在在div写上style样式，全局样式少用
- 标签不要写太多js

##### css规范
- css命名：一律中线分割(例如 banner-top )
- css层级：尽量三级以内

##### css,html,js缩进要求
- 缩进都用2空格

### 项目目录说明

```bash
├── mock                       # mock数据
├── public                     # 网站图标和首页
│   │── favicon.ico            # favicon
│   └── index.html             # index.html
├── src                        # 放开发代码
│   ├── api                    # api方法
│   ├── assets                 # 静态资源文件（图片）
│   ├── components             # 全局组件
│   ├── filters                # 全局过滤器
│   ├── icons                  # svg图标库
│   ├── layout                 # 系统首页layout（不要去改）
│   ├── router                 # 路由配置
│   ├── store                  # 全局变量store配置
│   ├── styles                 # 全局css
│   ├── utils                  # 全局公用方法
│   ├── views                  # 页面
│   ├── App.vue                # 主app组件
│   ├── main.js                # app入口文件
│   └── permission.js          # 路由拦截配置
├── .env.xxx                   # env 环境配置，axios请求的baseURL配置
├── .eslintrc.js               # eslint 配置
├── .babelrc                   # babel配置
├── vue.config.js              # vue-cli 配置
├── postcss.config.js          # postcss 配置
└── package.json               # package.json 
```

###  系统菜单接口返回和路由配置说明
#### 菜单路由和菜单文件夹是按中文名首字母命名（例如 系统管理 xtgl）,以 会议室管理（一级菜单）为例
| 菜单名                 | 菜单路由                 |  路由名                | 路由icon              | 路由页面地址                 |
| :------------------:  | :------------------:    | :------------------:  | :------------------: | :------------------:       |
| 会议室管理（一级菜单）    | /hysgl                  | Hysgl	                | hy11                 | 无                         |   
| 会议室预约（二级菜单）    | /hysgl/hysyy            | HysglHysyy            | 无               |  /views/hysgl/hysyy/index.vue  |
| 会议室管理 (二级菜单)    |  /hysgl/hysgl           | HysglHysgl            | 无                 | /views/hysgl/hysgl/index.vue  |
```bash
├── 菜单名   			
├── 会议室管理（一级菜单）      
├── 	会议室预约（二级菜单）     
├── 	会议室管理 (二级菜单)     
```
##### 特别说明目前该系统最多两级菜单，一级菜单有图标，二级菜单没图标
### 关于路由缓存， 页面name名说明，前方高能
##### 特别重要的说明，关于路由缓存,按上面 二级菜单会议室预约（路由为/hysgl/hysyy）, 路由name为HysglHysyy, 相应的views/hysgl/hysyy/index.vue的name要命名为HysglHysyy
#####  菜单路由vue页面已经添加，只需要相应页面开发，注意别忘了修改name按上面一条设置页面name

### 搭建环境所环境
- vue-cli4.x搭建，相关依赖包
- vue-cli4-dependencies：
  core-js
  vue 
  vue-router
  vuex
- vue-cli4-devDependencies: 
  @vue/cli-plugin-babel, 
  @vue/cli-plugin-eslint
  @vue/cli-plugin-router
  @vue/cli-plugin-vuex
  @vue/cli-service
  babel-eslint
  eslint
  eslint-plugin-vue
  sass
  sass-loader
  vue-template-compiler
- node版本 
  12.18.3
- 全局包
  eslint
  svgo


### 项目运行
- 全局安装包安装
- npm install -g svgo
- npm install -g eslint
- 安装相应依赖包
- yarn install
- 开发环境运行
- yarn run dev
- 生成项目打包文件
- yarn run build
- 检测src目录代码是否规范
- yarn run lint
- 修复src目录不规范代码
- yarn run lintfix
- 对src/icons的svg图标压缩处理
- yarn run svgo
