import router from '@/router'

// 路由加载滚动条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// nprogress配置
NProgress.configure({
	easing: 'ease',
	speed: 500,
	showSpinner: false,
	trickleSpeed: 200,
	minimum: 0.3
})

router.beforeEach((to, from, next) => {
	NProgress.start()
	next()
})

router.afterEach(() => {
	NProgress.done()
})