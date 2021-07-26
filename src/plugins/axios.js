import axios from 'axios'
import qs from 'qs'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base api url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})
// request拦截器 request interceptor
service.interceptors.request.use(
  config => {
    // 可在此设置要发送的token
    // config.headers['Content-Type'] = 'application/json;charset=UTF-8'
    const token = localStorage.getItem('token')
    token && (config.headers.token = token)
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)
// respone拦截器
service.interceptors.response.use(
  response => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误 结合自身业务和后台返回的接口状态约定写respone拦截器

    if (response.status === 200) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    return Promise.reject(error.response)
  }
)

/**
 * 封装get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
function get (url, params = {}) {
  return new Promise((resolve, reject) => {
    service
      .get(url, {
        params
      })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
  // 或者return axios.get();
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
function post (url, params = {}) {
  return new Promise((resolve, reject) => {
    service
      .post(url, qs.stringify(params))
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
  //  或者return axios.post();
}

export { get, post }
