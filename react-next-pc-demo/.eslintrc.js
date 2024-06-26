/** @type {import('eslint').Linter.Config} */
const config = {
  extends: [
    'next/core-web-vitals',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  rules: {
  },
  globals: {
    React: 'writable',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    browser: true,
    es2021: true,
  },
  ignorePatterns: ['public/**/*.js'],
};

module.exports = config;
