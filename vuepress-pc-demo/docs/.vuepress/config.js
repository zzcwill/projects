module.exports = {
  title: 'docDemo',
	description: 'A vuepress demo project',
  //base: '/doc/',
  // 设置输出目录
  dest: './dist',
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: '/favicon.ico'
      }
    ]
	],
  port: 8000,
  // 默认为 true，设置为 false 来禁用
  editLinks: true,
  themeConfig: {
    repo: 'zzcwill/vuepress',
    docsRepo: 'zzcwill/vuepress',
    // 如果你的文档不在仓库的根部
    docsDir: 'docs',
    // 可选，默认为 master
    docsBranch: 'master',    
    nav: [
      { text: '指南', link: '/guide/' },
			{ text: '功能', link: '/feature/' },
      {
        text: '菜单',
        items: [
          { text: '指南', link: '/guide/' },
          { text: '功能', link: '/feature/' },
        ]
      }			
		],
    sidebar: {
      '/guide/': [
        {
          title: '指南',
          collapsable: false,
          children: [
            '/guide/one.md',
            '/guide/two.md',
          ]
        },       
      ],      
      '/feature/': [
        {
          title: '功能',
          collapsable: true,
          children: [
            '/feature/one.md',
            '/feature/two.md',
          ]
        },       
      ]
    }	
  }, 	
}