module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-pxtorem": {
      rootValue: 75,
      propList: ["*"],
      selectorBlackList: [],
      minPixelValue: 2
    }    
  }
}
