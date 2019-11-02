export default {
  method: 'get',
  // 基础url前缀
  baseURL: 'http://localhost:8000/api/',
  // 请求头信息
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
    // 'Content-Type': 'multipart/form-data'
    // 'Content-Type': 'text/xml'
    // 'Content-Type': 'application/x-www-form-urlencoded'
  },
  // 无论请求为何种类型，在params中的属性都会以key=value的格式在urlzhong拼接
  params: {},
  // 设置超时时间
  timeout: 20000,
  // 携带凭证,请求数据类型包括  'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
  withCredentials: true,
  feadre_token: 'feadre_token' // 自定义标识
  // responseType: 'json'
}
