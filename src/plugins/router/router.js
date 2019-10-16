import Vue from 'vue'
import auth from '@/middleware/auth'
import guest from '@/middleware/guest'
import Router from 'vue-router'
import routerMiddleware from './router-middleware'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,

  routes: [
    {
      path: '/auth',
      name: 'auth',
      component: function () {
        return import('@/views/auth/Index')
      },
      redirect: {name: 'login'},
      meta: {
        middleware: guest
      },
      children: [
        {
          name: 'login',
          path: 'login',
          component: function () {
            return import('@/views/auth/Login')
          },
        },
      ]
    },
    {
      path: '/',
      name: 'home',
      component: function () {
        return import('@/views/personal/Index')
      },
      meta: {
        middleware: auth
      },
      children: [
        {
          name: 'dashboard',
          path: 'dashboard',
          component: function () {
            return import('@/views/personal/Dashboard')
          },
        },
        {
          path: 'admins',
          component: function () {
            return import('@/views/personal/Router')
          },
          children: [
            {
              name: 'administrators',
              path: '',
              component: function () {
                return import('@/views/personal/administrators/List')
              },
            }
          ]
        },
        {
          path: 'users',
          component: function () {
            return import('@/views/personal/Router')
          },
          children: [
            {
              name: 'users',
              path: '',
              component: function () {
                return import('@/views/personal/users/List')
              },
            },
            {
              name: 'users.view',
              path: ':id_phperson',
              component: function () {
                return import('@/views/personal/users/View')
              },
              props: true
            }
          ]
        },
        {
          path: 'news',
          component: function () {
            return import('@/views/personal/Router')
          },
          children: [
            {
              name: 'news',
              path: '',
              component: function () {
                return import('@/views/personal/news/List')
              },
            },
            {
              name: 'news.create',
              path: 'create',
              component: function () {
                return import('@/views/personal/news/Item')
              },
            },
            {
              name: 'news.edit',
              path: 'edit/:id',
              component: function () {
                return import('@/views/personal/news/Item')
              },
              props: true
            },
          ]
        }
      ]
    },
  ]
})

// Router middleware
routerMiddleware(router);

export default router;