const { Builder, By, Key, until } = require('selenium-webdriver')
// const { Options } = require('selenium-webdriver/chrome')
const schedule = require('node-schedule')

const { sleep } = require('./utils')

//淘宝账号
let taobao_userName = '841811316@qq.com'
let taobao_password = 'a817877818!'

const start = async () => {
	let driver = await new Builder().forBrowser('chrome').build()
	try {
		await driver.get('https://www.taobao.com/')
		await driver.findElement(By.className('h')).click()

		//模拟登录-start
		// await driver.findElement(By.name('fm-login-id')).clear()
		// await driver.findElement(By.name('fm-login-password')).clear()
		// await driver.findElement(By.name('fm-login-id')).sendKeys(taobao_userName)
		// await driver.findElement(By.name('fm-login-password')).sendKeys(taobao_password)
		//模拟登录-end

		//自己扫描登录-start
		await driver.findElement(By.className('icon-qrcode')).click()
		sleep(10000)
		//自己扫描登录-end
		
		//去购物车-点击购买-找到商品-点击购买-start
		await driver.findElement(By.id('mc-menu-hd')).click()

		// 月是从0开始
		let date = new Date(2020, 7, 12, 18, 16, 0)
		let buyButton = '//*[@id="J_Item_2142490801877"]/ul/li[1]/div/div/div/label'

		//淘宝账号
		let timer = schedule.scheduleJob(date, async () => {
			await driver.findElement(By.xpath(buyButton)).click()
			sleep(400)
			await driver.findElement(By.id('J_Go')).click()
			sleep(400)
			// await driver.findElement(By.className('go-btn')).click()			
		})
		//去购物车-点击购买-找到商品-点击购买-end

		//商品页-点击购买-start
		// let goodsUrl = 'https://detail.tmall.com/item.htm?id=614081481760&ali_refid=a3_430583_1006:1105504306:N:NeF4iO1u/gnu/oemiEEK6IUOVfhmyWUx:3dfd992a151346f844114dc9570f38fa&ali_trackid=1_3dfd992a151346f844114dc9570f38fa&spm=a230r.1.14.1&sku_properties=228680323:540835952'

		// let goodsSome = '//*[@id="J_DetailMeta"]/div[1]/div[1]/div/div[4]/div/div/dl[1]/dd/ul/li[2]'

		// let date2 = new Date(2020, 7, 12, 18, 33, 0)

		// await driver.get(goodsUrl)
		// await driver.findElement(By.xpath(goodsSome)).click()

		// let timer2 = schedule.scheduleJob(date2, async () => {
		// 	await driver.findElement(By.id('J_LinkBuy')).click()
		// 	sleep(400)
		// 	await driver.findElement(By.className('go-btn')).click()		
		// })
		//商品页-点击购买-end		


	} finally {
		// await driver.quit()
	}
}

// start()