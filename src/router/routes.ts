import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/pages/home/index.vue'),
    name: 'home',
    meta: {
      title: '首页',
    },
  },
  {
    path: '/Remote',
    component: () => import('@/pages/Remote/index.vue'),
    name: 'Remote',
    meta: {
      title: '远程控制',
    },
  },
  {
    path: '/GPU',
    component: () => import('@/pages/Gpu/index.vue'),
    name: 'GPU',
    meta: {
      title: '租用GPU',
    },
  },
  {
    path: '/DeviceList',
    component: () => import('@/pages/DeviceList/index.vue'),
    name: 'DeviceList',
    meta: {
      title: '设备列表',
    },
  },
  {
    path: '/IsWallet',
    component: () => import('@/pages/IsWallet/index.vue'),
    name: 'IsWallet',
    meta: {
      title: '创建钱包',
    },
  },
  {
    path: '/creatWallet',
    component: () => import('@/pages/creatWallet/index.vue'),
    name: 'creatWallet',
    meta: {
      title: '创建新钱包',
    },
  },
  {
    path: '/walletSuccess',
    component: () => import('@/pages/walletSuccess/index.vue'),
    name: 'walletSuccess',
    meta: {
      title: '创建新钱包',
    },
  },
  {
    path: '/openWallet',
    component: () => import('@/pages/openWallet/index.vue'),
    name: 'openWallet',
    meta: {
      title: '导入钱包',
    },
  },
]
