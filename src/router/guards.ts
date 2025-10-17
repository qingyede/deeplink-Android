import {
  type NavigationGuard,
  type RouteLocationNormalized,
  type NavigationGuardNext,
  type NavigationHookAfter,
  type NavigationFailure,
} from 'vue-router'
import { APP } from '@/constant/APP'
import { appStore } from '@/store/Modules/app/index'
// 前置
export const beforeEachH: NavigationGuard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const app = appStore()

  // 动态修改页面标题
  if (to.meta?.title) {
    document.title = `${to.meta.title}`
  } else {
    document.title = APP.appTitle
  }

  if (!app.isWalletRegistered) {
    // 未注册钱包：只有不在 IsWallet 页面时才强制跳转
    const whiteList = [
      'IsWallet',
      'creatWallet',
      'walletSuccess',
      'openWallet',
      'Remote',
      'palyIndex',
      'newsList',
      'Partner',
      'shareIndex',
      'miningNft',
      'shareGpuReward',
      'Settings',
      'nfts',
      'CloudComputers',
      'CloudCafe',
      'CloudComputersList',
      'CloudCafeList',
    ]
    if (!app.isWalletRegistered) {
      if (!whiteList.includes(to.name as string)) {
        next({ name: 'IsWallet' })
      } else {
        next()
      }
    } else {
      next()
    }
  } else {
    // 已注册钱包：不跳转，不管去哪个页面都放行（包括 IsWallet 页面）
    next()
  }
}

// 后置
export const afterEachH: NavigationHookAfter = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  failure: void | NavigationFailure | undefined
) => {}
