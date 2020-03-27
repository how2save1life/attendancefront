// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'
import axios from 'axios'
Vue.use(ElementUI);
Vue.prototype.axios = axios;
Vue.config.productionTip = false;


//beforeEach 必须在router生命前执行beforeEach
router.beforeEach((to, from, next) => {
  /**将vuex里的state存在localStorage中，防止刷新后清空
   * 本来写在App.vue的created()里，但是 全局路由钩子在根组件前，所以从created移到这里 否则beforeEach中读到的永远是默认state值*****/
  //在页面加载时读取localStorage里的状态信息
  sessionStorage.getItem("userMsg") && store.replaceState(Object.assign(store.state, JSON.parse(sessionStorage.getItem("userMsg"))));

  //在页面刷新时将vuex里的信息保存到localStorage里
  window.addEventListener("beforeunload", () => {
    sessionStorage.setItem("userMsg", JSON.stringify(store.state))
  });
  /********************************************************************************************************/

  //store的getters中定义获取用户信息的函数  getUserId getRoles
  //userId为空说明用户未登录
  //role 为 visitor说明用户未登录
  let role = store.getters.getRoles;
  console.log("beforeEach ", role)
  console.log("beforeEach ", store.getters.getUserId)
  /* if (role === 'visitor') {//未登录
     if (to.path !== '/login') {//跳转到登录页
       console.log("!!!!login!!!")
       return next({path: '/login'});
     } else {
       next();
     }
   } else {//已登录
     console.log("已登录")
     if (to.meta.requiresAuth && to.meta.role.indexOf(role) === -1) {//需要验证，role不正确
       console.log("用户不对 需要登录")
       next({path: '/login'})
 /!*      this.$confirm('请登录, 是否继续?', '权限不足', {
         confirmButtonText: '确定',
         cancelButtonText: '取消',
         type: 'warning',
       }).then(() => {
           return next({path: '/login'})
         }
       )*!/
       //next();
     } else {
       next()
     }
   }*/
  if (to.meta.requiresAuth && to.meta.role.indexOf(role) === -1) {//需要验证，role不正确
    console.log("用户不对 需要登录")
    next({path: '/login'})
    /*      this.$confirm('请登录, 是否继续?', '权限不足', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }).then(() => {
              return next({path: '/login'})
            }
          )*/
    //next();
  } else {
    next()
  }
  if (to.meta.title) {//换title
    document.title = to.meta.title
  }
});
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
