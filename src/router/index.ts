// src/router/index.ts
import { createRouter, createWebHashHistory, createWebHistory, type Router } from 'vue-router'
import { routes } from '@/router/routes'
import { beforeEachH, afterEachH } from './guards'

const router: Router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

// 前置守卫
router.beforeEach((to, from, next) => {
  beforeEachH(to, from, next)
})
// 后置守卫
router.afterEach((to, from, failure) => {
  afterEachH(to, from, failure)
})

export default router
