# webpack
> A webpack4 demo

### node
18.20.2

### 项目运行
- 安装相应依赖包
- yarn install
- 开发环境运行
- yarn dev
- 生成项目打包文件
- yarn build

### 1 webpack需要安装包
#### devDependencies
-	webpack
-	webpack-cli

### 2 转es6需要包
#### devDependencies
-	@babel/core
-	babel-loader
- @babel/preset-env
- @babel/plugin-transform-runtime
注意：babel-loader的版本
#### dependencies
-  @babel/polyfill
-  @babel/runtime


### 3处理css
-	css-loader
-	file-loader
-	style-loader

### 4处理less
-	less
-	less-loader

### 6 less引入图片
- url-loader

### 7 less引入字体
- url-loader

### 8 自动生成html
- html-webpack-plugin
- html-loader

### 9 清理打包文件dist
- clean-webpack-plugin

### 10 webpack-dev-server使用
- webpack-dev-server

### 11 开发生产环境配置
- webpack-merge


