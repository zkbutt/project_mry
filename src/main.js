// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss'
import 'font-awesome/scss/font-awesome.scss'
import api from './http/index'
import config from '@/http/config'
import store from '@/store'

Vue.use(ElementUI)
Vue.use(api)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

router.beforeEach((to, from, next) => {
  /* 路由守卫
sessionStorage.setItem('user', username)  // 保存会话
sessionStorage.removeItem('user', username)// 删除会话
sessionStorage.clear()
localStorage（永久保存）与sessionStorage一致，
  to: Route: 即将要进入的目标 路由对象
from: Route: 当前导航正要离开的路由
next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数
   */
  if (to.path === '/login') {
    localStorage.removeItem(config.feadre_token)
  }
  let token = localStorage.getItem(config.feadre_token)
  // 没有记录的token就跳登录界面
  if (!token && to.path !== '/login') {
    next({
      path: '/login'
    })
  } else {
    next()
  }
})

// main中实例化store
// var store = new vuex.Store({// store对象
//   state: {
//     xian: false
//   }
// })
