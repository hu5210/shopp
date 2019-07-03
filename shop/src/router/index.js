import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import NavBread from '@/components/NavBread'
import NavFooter from '@/components/NavFooter'
import GoodsList from '@/views/GoodsList'
import NavHeader from '@/components/NavHeader'
import Cart from '@/views/Cart'
import Address from '@/views/Address'
import OrderComfirm from '@/views/OrderComfirm'
import Ordersuccess from '@/views/Ordersuccess'
import Modal from '@/components/Modal'
Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // }
    {
      path: '/',
      name: 'GoodsList',
      component: GoodsList
    },
    {
      path: '/ navBread',
      name: ' NavBread',
      component: NavBread
    },
    {
      path: '/navFooter',
      name: 'NavFooter',
      component: NavFooter
    },
    {
      path: '/navHeader',
      name: 'NavHeader',
      component: NavHeader
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/address',
      name: 'Address',
      component:Address
    },
    {
      path: '/orderComfirm',
      name: 'OrderComfirm',
      component:OrderComfirm
    },
    {
      path: '/ordersuccess',
      name: 'Ordersuccess',
      component:Ordersuccess
    },
    {
      path: '/modal',
      name: 'Modal',
      component:Modal
    },
  ]
})
