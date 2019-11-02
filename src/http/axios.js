import axios from 'axios'
import config from './config'
import qs from 'qs'
import router from '@/router'
// import store from '@/store'

// 使用vuex做全局loading时使用
// import store from '@/store'

export default function $axios (options) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL: config.baseURL,
      headers: config.headers,
      data: config.data,
      timeout: config.timeout,
      withCredentials: config.withCredentials,
      // responseType: config.responseType,
      transformResponse: [function (data) {
        console.log('-------transformResponse-----------', data)
        // 在传递给 then/catch 前，允许修改响应数据
        // console.log(data)
        // data.age = 30 // 发送之前增加的属性
        // return qs.stringify(data) // 利用对应方法转换格式
      }]
    })

    // request 拦截器
    instance.interceptors.request.use(
      request => {
        // 每次带上token
        console.log(request.headers.Authorization)
        let token = localStorage.getItem(config.feadre_token)
        if (token != null) {
          request.headers.Authorization = 'Token ' + token
        } else {
          // 重定向到登录页面
          router.push('/login')
        }
        if (request.method === 'post' && request.data) {
          let prototypeOf = Object.getPrototypeOf(request.data)
          if (prototypeOf === FormData.prototype ||
            request.url.endsWith('path') ||
            request.url.endsWith('mark') ||
            request.url.endsWith('patchs')
          ) {

          } else {
            request.data = qs.stringify(request.data)
          }
        }
        return request
      },
      error => {
        console.log('-----过滤器出错拉-----', error)
        // 1. 判断请求超时
        if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
          console.log('-----timeout请求超时-----')
          // return service.request(originalRequest);// 再重复请求一次
        }
        // 2. 需要重定向到错误页面
        const errorInfo = error.response
        console.log(errorInfo)
        if (errorInfo) {
          error = errorInfo.data // 页面那边catch的时候就能拿到详细的错误信息,看最下边的Promise.reject
          const errorStatus = errorInfo.status // 404 403 500 ...
          router.push({
            path: `/error/${errorStatus}`
          })
        }
        return Promise.reject(error) // 在调用的那边可以拿到(catch)你想返回的错误信息
      }
    )

    // response 拦截器
    instance.interceptors.response.use(
      response => {
        let data
        // IE9时response.data是undefined，因此需要使用response.request.responseText(Stringify后的字符串)
        if (typeof (response.data) === 'undefined') {
          data = JSON.parse(response.request.responseText)
        } else {
          data = response.data
        }

        // 根据返回的code值来做不同的处理
        switch (data.rc) {
          case 1:
            console.log(data.desc)
            break
          case 0:
            // store.commit('changeState')
          // console.log('登录成功')
        }
        // 若不是正确的返回code，且已经登录，就抛出错误
        // const err = new Error(data.desc)
        // err.data = data
        // err.response = response
        // throw err

        return data
      },
      err => {
        if (err && err.response) {
          switch (err.response.status) {
            case 400:
              err.message = `请求错误---${err.response.status}`
              break
            case 401:
              err.message = `未授权，请登录---${err.response.status}`
              break
            case 403:
              err.message = `拒绝访问---${err.response.status}`
              break
            case 404:
              err.message = `请求地址出错---${err.response.status}--- ${err.response.config.url}`
              break
            case 405:
              err.message = `请求方法不允许---${err.response.status}`
              break
            case 408:
              err.message = `请求超时---${err.response.status}`
              break
            case 415:
              err.message = `服务器不接受这种数据类型的请求---${err.response.status}`
              break
            case 500:
              err.message = `服务器内部错误---${err.response.status}`
              break
            case 501:
              err.message = `服务未实现---${err.response.status}`
              break
            case 502:
              err.message = `网关错误---${err.response.status}`
              break
            case 503:
              err.message = `服务不可用---${err.response.status}`
              break
            case 504:
              err.message = `网关超时---${err.response.status}`
              break
            case 505:
              err.message = `HTTP版本不受支持---${err.response.status}`
              break
            default:
              err.message = `----------其它连接错误${err.response.status}----------`
          }
        }
        console.error(err)
        return Promise.reject(err) // 返回接口返回的错误信息
      }
    )
    // 请求处理
    instance(options).then(res => {
      resolve(res)
      return false
    }).catch(error => {
      reject(error)
    })
  })
}
