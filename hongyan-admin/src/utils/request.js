import Axios from 'axios'
import Qs from 'qs'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getTimeMs } from '@/utils/time'

const http = Axios.create({
	// api的base_url
	baseURL: process.env.VUE_APP_BASE_API,
  timeout: 50000,
  transformRequest: [function(data) {
    data = Qs.stringify(data)
    return data
  }]
})

// 设置请求头
http.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['token'] = store.getters.token
	}
  config.headers['jonId'] = getTimeMs()
	return config
}, error => {
	console.log(error)
	Promise.reject(error)
})

// 拦截响应response，并做一些错误处理
http.interceptors.response.use((response) => {
  const res = response.data
  if (res.code !== 0) {
    Message({
      message: res.msg || 'Error',
      type: 'error',
      duration: 5 * 1000
    })
    // token失效。处理,暂时没有后期改
    if (res.code === 20001) {
      MessageBox.confirm('你已经退出，需要重新登录吗', '提示', {
        confirmButtonText: '去登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
      })
    }
    return Promise.reject(new Error(res.msg || 'Error'))
  } else {
    return res
  }
}, (err) => {
	// 这里是返回状态码不为200时候的错误处理
	if (err && err.response) {
    Message({
      message: `${err.response.data.path}报错: ${err.response.data.message}`,
      type: 'error',
      duration: 5 * 1000
    })
	}
	return Promise.reject(err)
})

export default http
