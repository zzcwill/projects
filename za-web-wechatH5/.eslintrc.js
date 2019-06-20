module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    //禁止tab键-关闭
    'no-tabs': 'off',
    // 代码缩进-关闭
    'indent': 'off',
    // 禁用行尾空格-关闭
    'no-trailing-spaces': 'off',
    // 禁止出现多行空行-关闭
    'no-multiple-empty-lines': 'off',
    // 要求或禁止文件末尾存在空行-关闭
    'eol-last': 'off',
    // 强制在 function的左括号之前使用一致的空格 -关闭
    'space-before-function-paren': 'off',
    // 强制在注释中 // 或 /* 使用一致的空格  -关闭
    'spaced-comment': 'off',
    // 要求或禁止末尾逗号-关闭
    'comma-dangle': 'off',
    // 禁止出现未使用过的变量 -关闭
    'no-unused-vars': 'off',
    //禁止在return、throw、continue 和 break 语句之后出现不可达代码 --关闭
    'no-unreachable': 'off',
    'prettier': 'off',
    'keyword-spacing': 'off',
    'padded-blocks': 'off',
    'quotes': 'off',
    'object-property-newline': 'off',
    'eqeqeq': 'off',
    'no-array-constructor': 'off',
    'camelcase': 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
