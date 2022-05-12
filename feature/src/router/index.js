import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/plugin-market'
  },
  {
    path: '/plugin-market',
    name: 'plugin-market',
    component: () => import('@/views/pluginMarket/index.vue')
  },
  {
    path: '/my-plugin',
    name: 'my-plugin',
    component: () => import('@/views/myPlugin/index.vue')
  },
  {
    path: '/set',
    name: 'set',
    component: () => import('@/views/set/index.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('@/views/user/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
