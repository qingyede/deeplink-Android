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
      title: '玩游戏',
    },
    redirect: '/GPU/CloudComputers', // 添加这一行作为默认重定向
    children: [
      {
        path: 'CloudComputers', // 注意：子路由 path 不需要加 `/` 前缀
        component: () => import('@/pages/Gpu/modules/cloud-computers.vue'),
        name: 'CloudComputers',
        meta: {
          title: '租用云电脑',
        },
      },
      {
        path: 'CloudCafe',
        component: () => import('@/pages/Gpu/modules/cloud-cafe.vue'),
        name: 'CloudCafe',
        meta: {
          title: '租用云网吧',
        },
      },

      {
        path: 'CloudComputersList', // 注意：子路由 path 不需要加 `/` 前缀
        component: () => import('@/pages/Gpu/modules/cloud-computers-list.vue'),
        name: 'CloudComputersList',
        meta: {
          title: '云电脑列表',
        },
      },
      {
        path: 'CloudCafeList', // 注意：子路由 path 不需要加 `/` 前缀
        component: () => import('@/pages/Gpu/modules/cloud-cafe-list.vue'),
        name: 'CloudCafeList',
        meta: {
          title: '云网吧列表',
        },
      },
    ],
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
    path: '/Store',
    component: () => import('@/pages/Store/index.vue'),
    name: 'Store',
    redirect: '/Store/nfts',
    meta: {
      title: '商店',
    },
    children: [
      {
        path: 'nfts',
        component: () => import('@/pages/Store/modules/nfts/index.vue'),
        name: 'nfts',
        meta: {
          title: '租用云电脑',
        },
      },
      {
        path: 'PartnerProduct',
        component: () => import('@/pages/Store/modules/PartnerProduct/index.vue'),
        name: 'PartnerProduct',
        meta: {
          title: '租用云电脑',
        },
      },
    ],
  },
  {
    path: '/playWithUs',
    component: () => import('@/pages/playWithUs/index.vue'),
    name: 'playWithUs',
    redirect: '/playWithUs/palyIndex',
    meta: {
      title: '和我们一起玩',
    },
    children: [
      {
        path: 'palyIndex',
        component: () => import('@/pages/playWithUs/modules/palyIndex/index.vue'),
        name: 'palyIndex',
        meta: {
          title: '和我们一起玩',
        },
      },
      {
        path: 'newsList',
        component: () => import('@/pages/playWithUs/modules/newsList/index.vue'),
        name: 'newsList',
        meta: {
          title: '游戏新闻',
        },
      },
      {
        path: 'Partner',
        component: () => import('@/pages/playWithUs/modules/Partner/index.vue'),
        name: 'Partner',
        meta: {
          title: '合作伙伴',
        },
      },
    ],
  },
  {
    path: '/share',
    component: () => import('@/pages/shareGpu//index.vue'),
    name: 'share',
    redirect: '/share/shareIndex',
    meta: {
      title: '和我们一起玩',
    },
    children: [
      {
        path: 'shareIndex',
        component: () => import('@/pages/shareGpu/modules/shareIndex/index.vue'),
        name: 'shareIndex',
        meta: {
          title: 'GPU出租赚奖励',
        },
      },
      {
        path: 'miningNft',
        component: () => import('@/pages/shareGpu/modules/miningNft/index.vue'),
        name: 'miningNft',
        meta: {
          title: '我的挖矿节点NFT',
        },
      },
      {
        path: 'shareGpuReward',
        component: () => import('@/pages/shareGpu/modules/shareGpuReward/index.vue'),
        name: 'shareGpuReward',
        meta: {
          title: 'GPU出租赚租金',
        },
      },
    ],
  },
  {
    path: '/Settings',
    component: () => import('@/pages/Settings/index.vue'),
    name: 'Settings',
    meta: {
      title: '设置',
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
