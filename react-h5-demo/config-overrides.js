const path = require("path")
const { override, addWebpackAlias, fixBabelImports } = require('customize-cra')

function resolve(dir) {
	return path.join(__dirname, dir);
}

module.exports = override(
	addWebpackAlias({
		['@']: resolve('src')
	}),
  // 针对antd实现按需打包: 根据import来打包(使用babel-plugin-import)
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true, // 自动打包相关的样式
  }),
)
