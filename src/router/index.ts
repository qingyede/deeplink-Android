// src/router/index.ts
import { createRouter, createWebHistory, type Router } from 'vue-router'
import { routes } from '@/router/routes'
import { beforeEachH, afterEachH } from './guards'

const router: Router = createRouter({
  history: createWebHistory(),
  routes,
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
