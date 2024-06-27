/** @type {import('eslint').Linter.Config} */
const config = {
  extends: [
    'next/core-web-vitals',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
    'plugin:prettier/recommended'
  ],
  rules: {
    'prettier/prettier': ['error', require('./.prettierrc.js')]
  },
  globals: {
    React: 'writable'
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  env: {
    browser: true,
    es2021: true
  },
  ignorePatterns: ['public/**/*.js']
};

module.exports = config;
