import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/orderIndex',
      meta: {
        cur: 0
      }
    },
    {
      path: '/orderIndex',
      name: 'orderIndex',
      component: resolve => require(['@/components/orderIndex'], resolve),
      meta: {
        cur: 0
      }
    },
    {
      path: '/orderTeam',
      name: 'orderTeam',
      component: resolve => require(['@/components/orderTeam'], resolve),
      meta: {
        cur: 1
      }
    },
    {
      path: '/orderQuery',
      name: 'orderQuery',
      component: resolve => require(['@/components/orderQuery'], resolve),
      meta: {
        cur: 2
      }
    },
    {
      path: '/orderSuccess',
      name: 'orderSuccess',
      component: resolve => require(['@/components/orderSuccess'], resolve),
    },
    {
      path: '/orderList',
      name: 'orderList',
      component: resolve => require(['@/components/orderList'], resolve),
    },

  ]
})
