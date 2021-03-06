const path = require("path")
const { override, addWebpackAlias, addLessLoader, addPostcssPlugins } = require('customize-cra')

function resolve(dir) {
	return path.join(__dirname, dir);
}

module.exports = override(
  // 使用less-loader对源码中的less的变量进行重新指定
  addLessLoader({
    javascriptEnabled: true
  }),

  addPostcssPlugins([
    require('postcss-pxtorem')({
      rootValue: 75,
      propList: ["*"],
      selectorBlackList: [],
      minPixelValue: 2    
    }),
  ]),

	addWebpackAlias({
		['@']: resolve('src')
  })
)
