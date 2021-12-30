import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '../views/Welcome.vue'
import Home from '../views/Home.vue'
import Account from '../views/Account.vue'
import User from '../views/User.vue'

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome,
    meta: {
      title: "Login page",
      metaTags: [
        {
          name: 'Login page',
          content: 'The login / signup page of our example app.'
        },
        {
          property: 'og:description',
          content: 'The login / signup page of our example app.'
        }
      ]
    }
  },
  {
    path: '/home',
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
  },
  {
    path: '/user/:id',
    name: 'User',
    component: User,
    meta: {
      // transition: 'slide-right',
      title: 'User page',
      metaTags: [
        {
          name: 'User page',
          content: 'A user page.'
        },
        {
          property: 'og:description',
          content: 'A user page.'
        }
      ]
    }
  },
]

const router = createRouter({
  history: createWebHistory(),
  //base: process.env.BASE_URL,
  routes
})

export default router
