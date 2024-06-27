module.exports = {
  tabWidth: 2,
  useTabs: false, // 是否使用制表符进行缩进
  semi: true, // 使用分号
  singleQuote: true, // 使用单引号
  quoteProps: 'as-needed',
  jsxSingleQuote: false, // jsx 不使用单引号，而使用双引号
  trailingComma: 'none', // 后置逗号，多行对象、数组在最后一行不加逗号
  bracketSpacing: true, // 大括号内的首尾需要空格
  bracketSameLine: false,
  arrowParens: 'always', // 箭头函数使用括号
  jsxBracketSameLine: false, // jsx 标签的反尖括号需要换行
  requirePragma: false, // 不需要写文件开头的 @prettier
  insertPragma: false, // 不需要自动在文件开头插入 @prettier
  printWidth: 120,
  endOfLine: 'lf',
  overrides: [
    {
      files: ['src/**/*.tsx', 'src/**/*.ts'],
      options: {
        plugins: [
          require.resolve('@trivago/prettier-plugin-sort-imports'),
          require.resolve('prettier-plugin-tailwindcss')
        ],
        importOrder: [
          "^react(.*)",
          "<THIRD_PARTY_MODULES>",
          '^(next/(.*)$)|^(next$)',
          "antd",
          "@src/(.*)",
          '^[../]',
          '^[./]',
        ],
        importOrderSeparation: true,
        importOrderSortSpecifiers: true,
        importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
        tailwindConfig: './tailwind.config.ts'
      }
    },
    {
      files: ['*.json'],
      options: {
        parser: 'json'
      }
    }
    // {
    //   files: ['Dockerfile', '*.yml', '*.yaml'],
    //   options: {
    //     parser: 'yaml',
    //   },
    // }
  ]
};
