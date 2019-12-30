# webpack
> A webpack4 demo

### 项目运行
- 安装全局包
- npm install -g 
- 安装相应依赖包
- npm install
- 开发环境运行
- npx webpack
- 生成项目打包文件

### 1 webpack需要安装包
#### devDependencies
-	webpack
-	webpack-cli

### 2 转es6需要包
#### devDependencies
-	babel-core
-	babel-loader
-	babel-plugin-transform-runtime
- babel-preset-env
注意：babel-loader的版本
#### dependencies
-  babel-polyfill
-  babel-runtime

### 3 多页面提取公共代码
#### devDependencies
-  lodash

### 4处理css
#### devDependencies
-	css-loader
-	file-loader
-	style-loader

### 5 处理scss
#### devDependencies
-	node-sass
-	sass-loader

### 6 scss引入图片
#### devDependencies
- url-loader

### 7 scss引入字体
#### devDependencies
- url-loader

### 8 自动生成html
#### devDependencies
- html-webpack-plugin
- html-loader

### 9 清理打包文件dist
#### devDependencies
- clean-webpack-plugin

### 10 webpack-dev-server使用
#### devDependencies
- webpack-dev-server

### 11 开发生产环境配置
#### devDependencies
- webpack-merge


