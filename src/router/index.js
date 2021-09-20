import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Account from '../views/Account.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: "Home page",
      metaTags: [
        {
          name: 'Home page',
          content: 'The home page of our example app.'
        },
        {
          property: 'og:description',
          content: 'The home page of our example app.'
        }
      ]
    }
  },
  {
    path: '/account',
    name: 'Account',
    component: Account,
    meta: {
      // transition: 'slide-right',
      title: 'Account page',
      metaTags: [
        {
          name: 'Account page',
          content: 'The account page.'
        },
        {
          property: 'og:description',
          content: 'The account page.'
        }
      ]
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  //base: process.env.BASE_URL,
  routes
})

export default router
