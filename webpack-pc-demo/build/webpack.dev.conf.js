const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  devtool: "cheap-source-map",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 8000,
    // 开启热更新-1
    hot: true,
    overlay: true,
    open: false,
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
    // 开启热更新-2
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
};
