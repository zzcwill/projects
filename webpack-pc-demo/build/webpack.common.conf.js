const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const productionConfig = require("./webpack.prod.conf.js"); // 引入生产环境配置文件
const developmentConfig = require("./webpack.dev.conf.js"); // 引入开发环境配置文件

function resolve(dir) {
  return path.join(__dirname, dir)
}

/**
 * 根据不同的环境，生成不同的配置
 * @param {String} env "development" or "production"
 */
const generateConfig = env => {
  // 将需要的Loader和Plugin单独声明

  return {
    entry: {
      app: resolve("../src/app.js")
    },
    output: {
      publicPath: env === "production" ? "./" : "/",
      path: resolve("../dist"),
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
          test: /\.less$/,       
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
              loader: "less-loader"
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
                limit: 2000, // size <= 2KB
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
            name: "utils",
            test: /[\\/]utils[\\/]/,
            chunks: "all",
            minSize: 1,
            priority: 0
          },
          // 首先: 打包node_modules中的文件
          vendor: {
            name: "modules",
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
        "@": resolve("../src"),
      }
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: resolve("../index.html"),
        chunks: ['utils','modules',"app"], // entry中的app入口才会被打包
        minify: {
          // 压缩选项
          collapseWhitespace: true
        },
        favicon: resolve('../src/images/favicon.ico')
      }),
      new webpack.ProvidePlugin({
        $: "jquery", // npm
      })
    ]     
  };
};

module.exports = env => {
  let config = env === "production" ? productionConfig : developmentConfig;
  return merge(generateConfig(env), config);
};
