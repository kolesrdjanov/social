import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'mainView',
    component: () => import('@/views/MainView.vue'),
    redirect: {
      name: 'home'
    },
    meta: {
      auth: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/Home.vue')
      }
    ]
  },
  {
    path: '/sign-in',
    name: 'signIn',
    component: () => import('@/views/auth/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/auth/Register.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// protect the routes, for routes are life.
router.beforeEach((to, from, next) => {
  const user = store.getters['user/user']

  if (to.matched.some(record => record.meta.auth)) {
    if (user) {
      next()
    } else {
      next({ name: 'signIn' })
    }
	}

	if (to.name === 'signIn' || to.name === 'register') {
    if (user) {
      next({ name: 'home' })
    } else {
      next()
    }
	}
})

export default router
