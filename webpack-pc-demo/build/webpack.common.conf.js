const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const productionConfig = require("./webpack.prod.conf.js"); // 引入生产环境配置文件
const developmentConfig = require("./webpack.dev.conf.js"); // 引入开发环境配置文件

/**
 * 根据不同的环境，生成不同的配置
 * @param {String} env "development" or "production"
 */
const generateConfig = env => {
  // 将需要的Loader和Plugin单独声明

  return {
    entry: {
      app: "./src/app.js",
      pageA: "./src/pageA.js"
    },
    output: {
      publicPath: env === "production" ? "./" : "/",
      path: path.resolve(__dirname, "../dist"),
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
                publicPath: "./images/",
                outputPath: "images/"
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
          // 其次: 打包vendor公共代码
          common: {
            name: "vendor",
            test: /[\\/]vendor[\\/]/,
            chunks: "all",
            minSize: 1,
            priority: 0
          },
          // 首先: 打包node_modules中的文件
          vendor: {
            name: "vendor2",
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
        jquery2: path.resolve(__dirname, "../src/vendor/jquery-1.11.1.min.js")
      }
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: "./index.html",
        chunks: ['vendor','vendor2',"app",'pageA'], // entry中的app入口才会被打包
        minify: {
          // 压缩选项
          collapseWhitespace: true
        },
        favicon: './src/images/favicon.ico'
      }),
      new webpack.ProvidePlugin({
        $: "jquery", // npm
        jquery2: "jquery2" // 本地Js文件
      })
    ]     
  };
};

module.exports = env => {
  let config = env === "production" ? productionConfig : developmentConfig;
  return merge(generateConfig(env), config);
};
