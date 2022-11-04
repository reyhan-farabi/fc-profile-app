import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/index.vue'),
  },
  {
    path: '/club-list/:id',
    name: 'ClubList',
    component: () => import('../views/Club/index.vue'),
  },
  {
    path: '/club/:id',
    name: 'ClubDetail',
    component: () => import('../views/Club/Detail/index.vue'),
  },
  {
    path: '/player/:id',
    name: 'PlayerDetail',
    component: () => import('../views/Player/index.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router