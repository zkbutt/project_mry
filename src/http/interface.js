import axios from './axios'

/*
 * 将所有接口统一起来便于维护
 * 如果项目很大可以将 url 独立成文件，接口分成不同的模块
 */

// 单独导出
export const login = (data) => {
  return axios({
    url: '/api-token-auth/',
    method: 'post',
    data: data,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  })
}

export const getOrder = () => {
  return axios({
    url: '/order/4/',
    method: 'get'
  })
}

export const getMenu = data => {
  return axios({
    url: '/menu',
    method: 'post',
    data
  })
}

export const getCustomer = data => {
  return axios({
    url: '/customer/33/',
    method: 'get',
    data
  })
}

// 默认全部导出
export default {
  login,
  getOrder,
  getMenu,
  getCustomer
}
