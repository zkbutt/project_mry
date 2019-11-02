// 导入所有接口
import apis from './interface'

const install = Vue => {
  if (install.installed) { return }

  install.installed = true

  Object.defineProperties(Vue.prototype, {
    // 注意，此处挂载在 Vue 原型的 $api 对象上，并把接口上的方法输出
    $api: {
      get () {
        return apis
      }
    }
  })
}

export default install
