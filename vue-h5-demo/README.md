# vue-h5
> A vue-h5 demo project

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
- vue组件最外层class：建议用组件名（如组件名CamelCase  用camel-case)

##### css,html,js缩进要求
- 缩进都用2空格


### 框架约定
- 样式 ：less 
- UI ： 移动端使用  , PC 端使用 element-ui 
- 网络 ： axios
- 基础库: vue.js、vue-router、vuex
- 编译/打包工具：webpack、babel、、node-less
- 单元测试工具：unit、e2e


### 搭建环境所需依赖包
- vue-cli3.0搭建，还需装的依赖包
- dependencies：axios，babel-polyfill，qs,vux
- devDependencies: postcss-pxtorem


### 项目运行
- 安装相应依赖包
- npm install
- 开发环境运行
- npm run serve 
- 生成项目打包文件
- npm run build
