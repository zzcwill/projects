module.exports = {
  root: true, 
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: [
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
    "no-prototype-builtins": "off"    
  }
}
