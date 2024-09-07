import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/pages/home/index.vue'),
    name: 'home',
    meta: {
      title: '我是首页',
    },
  },
  {
    path: '/test',
    component: () => import('@/pages/test/index.vue'),
    name: 'test',
    meta: {
      title: '我是测试页',
    },
  },
]
