import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'signature',
    component: () => import('../views/demo.vue'),
    meta: { title: '手写板', keepAlive: true, auth: false }
  }
]

const router = new VueRouter({
  routes,
  scrollBehavior: () => ({ y: 0 })
})
// 登录权限
// router.beforeEach((to, from, next) => {
//   let auth = to.meta.auth
// document.title = to.meta.title
//   let token = store.getters['login/token'];
//   if (auth) { // 需要登录
//     if (token) {
//       next()
//     } else {
//       next({
//         path: '/login'
//       })
//     }
//   } else {
//     next()
//   }
// })

export default router
