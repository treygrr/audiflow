import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../layouts/MainLayout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    component: Home,
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import('../pages/Main.vue'),
      },
      {
        path: '/about',
        name: 'About',
        component: () => import(/* webpackChunkName: "about" */ '../pages/About.vue')
      }
    ]
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
