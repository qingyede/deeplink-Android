import {
  type NavigationGuard,
  type RouteLocationNormalized,
  type NavigationGuardNext,
  type NavigationHookAfter,
  type NavigationFailure,
} from 'vue-router'
import { APP } from '@/constant/APP'

// 前置
export const beforeEachH: NavigationGuard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  window.NProgress?.start()
  // 动态修改应用标题
  if (to.meta?.title) {
    // 如果有标题
    document.title = `${to.meta.title}`
  } else {
    document.title = APP.appTitle
  }
  next()
}

// 后置
export const afterEachH: NavigationHookAfter = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  failure: void | NavigationFailure | undefined
) => {
  console.log(to, from, failure)
  window.NProgress?.done()
}
