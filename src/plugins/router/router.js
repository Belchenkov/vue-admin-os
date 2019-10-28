import Vue from 'vue'
import auth from '@/middleware/auth'
import guest from '@/middleware/guest'
import Router from 'vue-router'
import routerMiddleware from './router-middleware'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    document.getElementById('app').scrollIntoView()
  },
  routes: [
    {
      path: '/auth',
      name: 'auth',
      component: function () {
        return import('@/views/auth/Index')
      },
      redirect: {name: 'login'},
      children: [
        {
          name: 'login',
          path: 'login',
          component: function () {
            return import('@/views/auth/Login')
          },
          meta: {
            middleware: guest,
            title: 'Авторизация'
          }
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
      redirect: {name: 'dashboard'},
      children: [
        {
          name: 'dashboard',
          path: 'dashboard',
          component: function () {
            return import('@/views/personal/Dashboard')
          },
          meta: {
            title: 'Панель статистики'
          }
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
              meta: {
                title: 'Список администраторов'
              }
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
              meta: {
                title: 'Список пользователей'
              }
            },
            {
              name: 'users.view',
              path: ':id_phperson',
              component: function () {
                return import('@/views/personal/users/View')
              },
              meta: {
                title: 'Профиль пользователя'
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
              meta: {
                title: 'Список новостей'
              }
            },
            {
              name: 'news.create',
              path: 'create',
              component: function () {
                return import('@/views/personal/news/Item')
              },
              meta: {
                title: 'Новая новость'
              }
            },
            {
              name: 'news.edit',
              path: 'edit/:id',
              component: function () {
                return import('@/views/personal/news/Item')
              },
              meta: {
                title: 'Редактирование новости'
              },
              props: true
            },
          ]
        },
        {
          path: 'mailing',
          component: function () {
            return import('@/views/personal/Router')
          },
          children: [
            {
              name: 'mailing',
              path: '',
              component: function () {
                return import('@/views/personal/mailing/List')
              },
              meta: {
                title: 'Список рассылок'
              }
            },
            {
              name: 'mailing.create',
              path: 'create',
              component: function () {
                return import('@/views/personal/mailing/Item')
              },
              meta: {
                title: 'Новая рассылка'
              }
            },
          ]
        }
      ]
    },
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
});

// Router middleware
routerMiddleware(router);

export default router;