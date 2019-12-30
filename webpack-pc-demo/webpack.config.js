const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    css: "./src/css.js",
    app: "./src/app.js",
    app2: "./src/app2.js",
    pageA: "./src/pageA.js",
    pageB: "./src/pageB.js"
  },
  output: {
    publicPath: "/",
    path: path.resolve(__dirname, "dist"),
    filename: "[name]-[hash:5].bundle.js",
    chunkFilename: "[name]-[hash:5].chunk.js"
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {
              attrs: ["img:src"]
            }
          }
        ]
      },      
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader" // 转化需要的loader
        }
      },
      {
        test: /\.scss$/,       
        // scss处理为style标签
        use: [
          {
            loader: "style-loader",
            options: {
              singleton: true,
            }
          },
          {
            loader: "css-loader"
          },
          {
            loader: "sass-loader"
          }          
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "[name]-[hash:5].min.[ext]",
              limit: 20000, // size <= 20KB
              publicPath: "./img/",
              outputPath: "img/"
            }
          }
        ]
      },
      {
        test: /\.(eot|woff|ttf|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "[name]-[hash:5].min.[ext]",
              limit: 1000,
              publicPath: "./fonts/",
              outputPath: "fonts/"
            }
          }
        ]
      }                
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        // 注意: priority属性
        // 其次: 打包业务中公共代码
        common: {
          name: "common",
          chunks: "all",
          minSize: 1,
          priority: 0
        },
        // 首先: 打包node_modules中的文件
        vendor: {
          name: "vendor",
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
          priority: 10
          // enforce: true
        }
      }
    }
  },
  resolve: {
    alias: {
      jquery2: path.resolve(__dirname, "src/vendor/jquery-1.11.1.min.js")
    }
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 8004,
    hot: true,
    overlay: true,
    open: true,
    proxy: {
      '/api': {
        target: 'https://cnodejs.org/api/v1',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    historyApiFallback: true
  },  
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./index.html",
      chunks: ['css','common','vendor',"app","app2",'pageA','pageB'], // entry中的app入口才会被打包
      minify: {
        // 压缩选项
        collapseWhitespace: true
      },
      favicon: './src/img/favicon.ico'
    }),
    new webpack.ProvidePlugin({
      $: "jquery", // npm
      jquery2: "jquery2" // 本地Js文件
    }),    
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new CleanWebpackPlugin()  
  ]   

};