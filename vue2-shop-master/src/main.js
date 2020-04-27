import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from '@/vuex/store.js'   //vuex
import api from '@/http/api.js'       //http请求
import less from 'less'
import Mint from 'mint-ui';    //移动端UI
import 'mint-ui/lib/style.css'
import DatePicker from 'element-ui/lib/date-picker';
import Upload from 'element-ui/lib/upload';
import From from 'element-ui/lib/form';
import 'element-ui/lib/theme-chalk/index.css';
import FromItem from 'element-ui/lib/form-item';
import Rate from 'element-ui/lib/rate';
import Input from 'element-ui/lib/input';
Vue.component(DatePicker.name, DatePicker)
Vue.component(Upload.name, Upload)
Vue.component(From.name, From)
Vue.component(FromItem.name, FromItem)
Vue.component(Rate.name, Rate)
Vue.component(Input.name, Input)
Vue.use(Mint);
Vue.config.productionTip = false
Vue.prototype.$api = api;


// 用钩子函数beforeEach()对路由进行判断

router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {  // 需要权限,进一步进行判断
      if (sessionStorage.getItem("username")) {// 通过vuex state获取当前的token是否存在

        next();
      }
      else {    //如果没有权限,重定向到登录页,进行登录
        next({
          path: '/login',
          // query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
        })
      }
    }
    else { //不需要权限 直接跳转
      next();
    }
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
