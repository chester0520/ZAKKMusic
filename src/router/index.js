import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store/index.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '查克樂器'
    }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import(/* webpackChunkName: "cart" */ '../views/Cart.vue'),
    meta: {
      login: true,
      title: '購物車 | 查克樂器'
    }
  },
  {
    path: '/news',
    name: 'News',
    component: () => import(/* webpackChunkName: "news" */ '../views/News.vue'),
    meta: {
      title: '最新消息 | 查克樂器'
    }
  },
  {
    path: '/productlist',
    name: 'Productlist',
    component: () => import(/* webpackChunkName: "productlist" */ '../views/Productlist.vue'),
    meta: {
      title: '商品列表 | 查克樂器'
    }
  },
  {
    path: '/aboutus',
    name: 'Aboutus',
    component: () => import(/* webpackChunkName: "aboutus" */ '../views/Aboutus.vue'),
    meta: {
      title: '關於我們 | 查克樂器'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    meta: {
      title: '登入 | 查克樂器'
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue'),
    meta: {
      title: '註冊 | 查克樂器'
    }
  },
  {
    path: '/:id',
    name: 'Product',
    component: () => import(/* webpackChunkName: "product" */ '../views/Product.vue'),
    meta: {
      title: '商品內容 | 購物網'
    }
  },
  {
    path: '/userinfo',
    name: 'Userinfo',
    component: () => import(/* webpackChunkName: "userinfo" */ '../views/Userinfo.vue'),
    meta: {
      title: '會員專區 | 查克樂器',
      login: true
    },
    children: [
      {
        path: 'personal',
        name: 'Personal',
        component: () => import(/* webpackChunkName: "personal" */ '../views/Personal.vue'),
        meta: {
          title: '個人資料修改 | 查克樂器',
          login: true
        }
      },
      {
        path: 'order',
        name: 'Order',
        component: () => import(/* webpackChunkName: "order" */ '../views/Order.vue'),
        meta: {
          title: '訂單查詢 | 查克樂器',
          login: true
        }
      },
      {
        path: 'service',
        name: 'Service',
        component: () => import(/* webpackChunkName: "service" */ '../views/Service.vue'),
        meta: {
          title: '個人資料修改 | 查克樂器',
          login: true
        }
      }
    ]
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import(/* webpackChunkName: "admin" */ '../views/Admin.vue'),
    meta: {
      admin: true,
      login: true,
      title: '後台管理 | 查克樂器'
    },
    children: [
      {
        path: 'AdminProducts',
        name: 'AdminProducts',
        component: () => import(/* webpackChunkName: "AdminProducts" */ '../views/AdminProducts.vue'),
        meta: {
          admin: true,
          login: true,
          title: '商品管理 | 查克樂器'
        }
      },
      {
        path: 'AdminOrders',
        name: 'AdminOrders',
        component: () => import(/* webpackChunkName: "AdminOrders" */ '../views/AdminOrders.vue'),
        meta: {
          admin: true,
          login: true,
          title: '訂單管理 | 查克樂器'
        }
      },
      {
        path: 'AdminNews',
        name: 'AdminNews',
        component: () => import(/* webpackChunkName: "AdminNews" */ '../views/AdminNews.vue'),
        meta: {
          admin: true,
          login: true,
          title: '最新消息管理 | 查克樂器'
        }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.login && store.state.user.account.length === 0) {
    next('/login')
  } else if (to.meta.admin && store.state.user.role !== 1) {
    next('/')
  } else {
    next()
  }
})

router.afterEach((to, from) => {
  document.title = to.meta.title
})

export default router
