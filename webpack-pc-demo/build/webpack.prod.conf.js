const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: "production",
  plugins: [
    // 清除dist的文件
    new CleanWebpackPlugin()
  ]
};
