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
  },
  {
    path: '/user/:id',
    name: 'User',
    component: User,
    meta: {
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
    },
    beforeEnter: (to, from, next) => {
      function isValid(param){
       return !isNaN(param);
      }

      if(!isValid(to.params.id)) {
        console.log("here");
        next({name: 'Home'});
      } else {
        next();
      }
    }
  },
  {
    path: '/:catchAll(.*)',
    name: 'notFound',
    redirect: '/home'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

//if we're not connected, redirect to login page
router.beforeEach((to, from, next) => {
  const isConnected = localStorage.getItem('groupomaniaToken');
  if( !isConnected && to.name !== 'Welcome'){
    next({ name: 'Welcome' });
  } else{
    next();
  }
})

export default router
