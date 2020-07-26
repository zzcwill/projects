module.exports = {
  root: true, 
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: [
    "plugin:vue/essential",
    "eslint:recommended"
  ],
  parserOptions: {
    parser: "babel-eslint",
    sourceType: 'module'
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-unused-vars": "off",
    "no-prototype-builtins": "off",
    // vue相关
    //组件大小写未使用
    "vue/no-unused-components": ["error", {
      "ignoreWhenBindingPresent": true
    }]    
  }
}
