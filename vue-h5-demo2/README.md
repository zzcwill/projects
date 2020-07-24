# vue-h5
> A hongyan-h5 project

### 命名规范
##### 命名规则：不能用中文拼音，尽量简洁明了
- 项目命名： 一律中线分割(例如 vue-template )
- 文件夹命名： 一律中线分割(例如 vue-template)
- 文件命名
  - vue组件文件命名：大驼峰式命名法（例如CamelCase.vue），且组件name值需要和文件名一致
  - js,css，img文件命名： 一律中线分割(例如 vue-template)

##### js规范
- js 命名的变量及方法名尽量采用小驼峰形式命名( 如 countDown)
- js 字符串变量都有单引号，如遇到单双引号嵌套
（如 `There are <b>${basket.count}</b> items`）
- js 方法和变量写完不加;
- js中 = () + - 需要与变量分开（ 例如  a = b + c ）
- js中 ：左边不空格，右边要空格（a: 3）
- js尽量使用 es6语法，定义方法用箭头函数
- import 进来的变量名如果是包的话尽量大写(import Router from 'vue-router')
- js中，分隔符，左边不空格，右边一空格

##### html规范
- html标签变量都用双引号
- 不要在div写上style样式，
- 标签不要写太多js

##### css规范
- css命名：一律中线分割(例如 banner-top )
- css层级：尽量三级以内

##### css,html,js缩进要求
- 缩进都用2空格


### 框架约定
- 样式：less 
- UI： 移动端使用vant 
- 网络： axios
- 基础库：vue.js、vue-router
- 编译/打包工具：webpack、babel、、node-less
- 插件：js-cookie,loadsh,moment
- mock：mockjs
- 开发工具：vscode
#### ui组件vant官网: https://youzan.github.io/vant/?source=vuejsorg#/zh-CN/

### 关于设计稿
- 设计稿以750*1136尺寸开发
- 开发用px 自动按750设计稿下的px大小转rem
- flexible.js经过改造,所有分辨率按750下的设计稿尺寸，等比例缩放
#### 只有宽度做等比例缩放，高度没做缩放

### 全局变量
- 由于store维护比较麻烦，定义了一个global全局变量
- 用户相关信息都存在cacheData.user
- 后期全局变量要加也加在/global/index.js文件的cacheData里，注意加注释说明
####  页面需要全局变量时候
####  import { cacheData } from '@/global' 调用即可获取  

###  请求回调
- 推荐用  async,await模式
- 参考： /src/views/demo/demo1/index.vue的async,await用法

### 项目路由模块
- 系统相关  app
- 模板相关  demo
- 用户绑定  yhbd
- 访客预约  fkyy
- 商家后台  sjht
- 食堂后台  stht
- 物业后台  wyht
#### 相关页面写在相应/router 和/api路径下相应的模块内
#### 基础页面demo 直接复制/views/demo/demo1 进行修改

### 搭建环境所需依赖包
- vue-cli3.0搭建，还需装的依赖包
- dependencies：axios，babel-polyfill，qs, vant,js-cookie,loadsh,moment,mockjs
- devDependencies: postcss-pxtorem


### 项目运行
- 安装相应依赖包
- npm install
- 开发环境运行
- npm run dev 
- 生成项目打包文件
- npm run build
