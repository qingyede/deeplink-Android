<template>
  <div class="px-[16px]">
    <!-- 顶部按钮 -->
    <n-button class="w-full rounded-lg min-h-[48px] mb-[50px]" type="primary" round>
      <span class="text-lg w-full"> {{ $t('devices.devices') }}</span>
    </n-button>

    <!-- 可用设备 -->
    <n-card :title="titleH1" class="rounded-lg mb-8 dark:bg-[#1e1e1e] transition-colors duration-300" content-class="!px-4">
      <!-- 加载中骨架屏 -->
      <div class="flex flex-col gap-2" v-if="loading1">
        <n-skeleton class="rounded-lg" size="large" />
        <n-skeleton class="rounded-lg" size="large" />
        <n-skeleton class="rounded-lg" size="large" />
        <n-skeleton class="rounded-lg" size="large" />
      </div>

      <!-- 有设备数据 -->
      <div v-else-if="deviceList.length > 0" class="flex flex-col gap-2">
        <n-button
          v-for="(item, index) in deviceList"
          :key="index"
          :loading="item.loading"
          color="#E1EBE7"
          class="rounded-lg py-2 h-full w-full dark:bg-[#2c2c2c] transition-colors duration-300"
          @click="handleMergedClick(item, 0)"
        >
          <div class="flex flex-nowrap justify-between w-full gap-8">
            <div class="flex items-center gap-2 flex-1 justify-center flex-wrap">
              <div class="rounded-lg bg-white dark:bg-[#444] w-8 h-8 p-1">
                <Icon :icon="item.icon" class="text-[22px]" />
              </div>
              <span class="text-sm text-left md:text-base font-bold text-black dark:text-white text-wrap flex-1">
                {{ item.name }}
              </span>
            </div>
            <div class="flex items-center gap-1 max-w-[120px] justify-center">
              <Icon
                icon="mdi:circle-slice-8"
                class="text-[28px] mr-1 animate-pulse"
                :class="item.statusValue === 'Online' ? 'text-success-500' : 'text-gray-400'"
              />
              <span class="text-base text-[#615F63] dark:text-white/70 text-wrap"> {{ item.status }} </span>
            </div>
          </div>
        </n-button>
      </div>

      <!-- 无可用设备数据 -->
      <div v-else class="my-6">
        <n-empty :description="$t('app.noData')" />
      </div>
    </n-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, h, onMounted, onUnmounted } from 'vue'
import { NButton, NGradientText } from 'naive-ui'
import { Icon } from '@iconify/vue'
import { useAppSocket } from '@/hooks/common/useAppSocket'
import { appStore } from '@/store/Modules/app'
import deviceInfoDIalog from './dialogs/deviceInfoDIalog.vue'
import { getDeviceIcon } from '@/utils/common/getDeviceIcon'
import { useDeviceListStore } from '@/store/Modules/deviceList/index'
import { useRemoteStream } from '@/hooks/remote/useRemoteStream'
import { useGetEvmSignature } from '@/hooks/wallet/useGetEvmSignature'
import { useBuyNftStore } from '@/store/Modules/buyNft/index'
import { objectToBase64 } from '@/utils/common/objToBase64'
import { useI18n } from 'vue-i18n'
import { parseNotes, parseName } from '@/utils/common/parseNotes'

const { t } = useI18n()
const { getEvmSignature } = useGetEvmSignature(t)
const nftStore = useBuyNftStore()
const { connectToRemoteDevice, connectToAndroidRemoteDevice } = useRemoteStream()
const app = appStore()
const { connect, send, onMessage, waitForReady, onOpen, offMessage } = useAppSocket()
const deviceListStore = useDeviceListStore()

function useMergedClickHandler<T extends any[]>(
  singleFn: (...args: T) => void,
  doubleFn: (...args: T) => void,
  delay = 250
) {
  let lastClickTime = 0
  let clickTimer: ReturnType<typeof setTimeout> | null = null

  return (...args: T) => {
    const now = Date.now()
    const delta = now - lastClickTime
    lastClickTime = now

    if (clickTimer) {
      clearTimeout(clickTimer)
      clickTimer = null
    }

    if (delta < delay) {
      doubleFn(...args) // 识别为双击
    } else {
      clickTimer = setTimeout(() => {
        singleFn(...args) // 延迟执行单击逻辑
        clickTimer = null
      }, delay)
    }
  }
}

const handleMergedClick = useMergedClickHandler(
  (item, type) => showInfo(item, type), // 单击逻辑
  (item, type) => rentDevice(item, type) // 双击逻辑
)

// 卡片标题组件
const titleH1 = () => {
  return h('div', { class: 'flex items-center gap-3' }, [
    h(Icon, {
      icon: 'mdi:devices',
      class: '!text-[24px] min-w-[30px] min-h-[30px] text-[#000] dark:text-white',
    }),
    h('div', { class: 'flex flex-wrap' }, [
      h('div', { class: 'flex items-center flex-wrap' }, [
        h(
          'div',
          { class: 'text-[#000] dark:text-white text-[14px] font-bold' },
          t('devices.deviceList') // ✅ 保留国际化
        ),
        h(
          'div',
          { class: 'text-[#737373] dark:text-white/60 text-[10px]  ml-1' },
          t('devices.deviceStartTip') // ✅ 保留国际化
        ),
      ]),
    ]),
  ])
}

// 设备列表数据
const deviceList: any = ref([])

// 设备列表loading
let loading1 = ref(true)

// 初始化用户机器列表
deviceListStore.getUserDeviceListH()

// 展示机器信息
const showInfo = (item: any, n: number) => {
  console.log(item.online, 'UUU')

  if (n === 0) {
    // 先判断是否在线
    if (item.online) {
      // 展示机器信息
      console.log(item)

      let negativeButtonPropsLoading = ref(false)
      const d = window.$dialog?.info({
        title: () => {
          return h(
            NGradientText,
            {
              size: 24,
              type: 'success',
              class: 'font-bold',
            },
            { default: () => t('devices.info') }
          )
        },
        content: () => h(deviceInfoDIalog, { item, d, fetchDeviceList }),
        class: 'rounded-2xl dark:bg-[#1a1a1a] dark:text-white',
        positiveText: t('devices.connectNow'),
        negativeText: t('devices.unbind'),
        positiveButtonProps: { color: '#03C188', size: 'medium' },
        negativeButtonProps: { color: '#EF4444', loading: negativeButtonPropsLoading.value, size: 'medium' },
        onPositiveClick: async () => {
          if (d) {
            try {
              d.loading = true
              await rentDevice(item, 0)
            } catch (error) {
            } finally {
              d.loading = false
            }
          }
        },
        onNegativeClick: async () => {
          console.log(item, '8888888888')
          await send({
            id: 1,
            method: 'unbindDevice',
            token: app.token,
            params: { device_id: item.deviceCode },
          })

          return false
        },
        showIcon: false,
      })
    }
  } else {
    // 展示我的机器信息
    console.log(item)
  }
}
// 远程设备
const rentDevice = async (item: any, n: number) => {
  if (n === 0) {
    console.log(item.online, 'PPPPPPP')
    // 先判断是否在线
    if (item.online) {
      // 先获取nft
      await nftStore.getMyNftListH()
      console.log(nftStore.hasNft, 'nftStore.hasNftnftStore.hasNftnftStore.hasNftnftStore.hasNftnftStore.hasNft')

      const rs: any = await getEvmSignature()
      console.log(rs, '签名签名签名签名')
      if (rs) {
        console.log({ id: item.device_id, password: `evm.renter.${app.address}.${rs.nonce}.${rs.signature}` }, '关键信息')

        console.log(
          {
            // 钱包地址 随机数 和签名，使用钱包签名远程时需要
            wallet: app.address,
            nonce: rs.nonce,
            signature: rs.signature,
            // 钱包类型，老的 DBC 钱包用 "subscan"
            wallet_type: 'evm',
            // 钱包角色，0 是默认值，没有意义，1 是自己的钱包，2 是租用人
            wallet_role: 1,
            nft_enabled: nftStore.hasNft,
            // // 传到被控端创建虚拟显示器
            display: {
              width: 1920,
              height: 1080,
              fps: 60,
            },
          },
          '具体数据'
        )
        try {
          const obj = {
            // 钱包地址 随机数 和签名，使用钱包签名远程时需要
            wallet: app.address,
            nonce: rs.nonce,
            signature: rs.signature,
            // 钱包类型，老的 DBC 钱包用 "subscan"
            wallet_type: 'evm',
            // 钱包角色，0 是默认值，没有意义，1 是自己的钱包，2 是租用人
            wallet_role: 1,
            nft_enabled: nftStore.hasNft,
            // // 传到被控端创建虚拟显示器
            display: {
              width: 1920,
              height: 1080,
              fps: 60,
            },
          }
          connectToRemoteDevice({
            id: item.device_id,
            password: JSON.stringify(obj) as any,
          })
        } catch (error) {
          return false
        }
      } else {
        return false
      }
    }
  } else {
    // 远程租用的设备
    if (item.status === 'Online') {
      item.status = 'Offline'
    } else {
      item.status = 'Online'
    }

    const rs: any = await getEvmSignature()
    console.log(rs, '签名签名签名签名')
    if (rs) {
      console.log({ id: item.device_id, password: `evm.renter.${app.address}.${rs.nonce}.${rs.signature}` }, '关键信息')
      try {
        connectToRemoteDevice({
          id: item.device_id,
          password: objectToBase64({
            // 租用开始时间，毫秒级时间戳，没租用传 0 或者不传
            rent_start_time: Math.floor(Date.now() / 1000),
            // 租用时长，单位秒，没租用传 0 或者不传
            rent_time: item.rent_time * 60,
            // 钱包地址 随机数 和签名，使用钱包签名远程时需要
            wallet: app.address,
            nonce: rs.nonce,
            signature: rs.signature,
            // 钱包类型，老的 DBC 钱包用 "subscan"
            wallet_type: 'evm',
            // 钱包角色，0 是默认值，没有意义，1 是自己的钱包，2 是租用人
            wallet_role: 2,
            // // 传到被控端创建虚拟显示器
            display: {
              width: 1920,
              height: 1080,
              fps: 60,
            },
          }),
        })
      } catch (error) {
        return false
      }
    } else {
      return false
    }
  }
}

onMounted(async () => {
  connect()

  onMessage(handleDeviceListMessage)

  try {
    await waitForReady()
  } catch (err) {
    console.warn('[WS] ❌ 连接失败:', err)
    return
  }

  onOpen(() => {
    console.log('[onOpen] 触发 fetchDeviceList')
    // ✅ 放到下一个事件循环执行，确保 handler 注册完毕
    setTimeout(() => {
      fetchDeviceList()
    }, 0)
  })

  // ✅ 页面初次进入也拉一遍，延迟执行
  setTimeout(() => {
    fetchDeviceList()
  }, 0)
})
// ✅ 具名函数：处理设备列表消息
const handleDeviceListMessage = (event: MessageEvent) => {
  try {
    const message = JSON.parse(event.data)
    console.log(message.method, 'message.method')
    if (message.method === 'getDeviceList' && message.result.device_list) {
      console.log('✅ 具名函数：处理设备列表消息')
      deviceList.value = message.result.device_list.map((item: any) => ({
        name: parseName(item.device_name),
        icon: getDeviceIcon(item.os_release),
        status: item.online ? t('devices.Online') : t('devices.Offline'),
        loading: false,
        statusValue: item.online ? 'Online' : 'Offline',
        deviceCode: item.device_id,
        os: item.os_release,
        ...item,
      }))
    } else if (message.method === 'unbindDevice') {
      console.log(message, 'FFF')
      // 刷新页面
      window.location.reload()
      window.$message?.success(t('app.unbindSuccess'))
    }
  } catch (err) {
    console.error('[WS] ❌ 消息解析失败:', err)
  } finally {
    loading1.value = false
  }
}

// ✅ 页面卸载时移除监听器，防止重复触发
onUnmounted(() => {
  offMessage(handleDeviceListMessage)
})

// 发送请求：获取设备列表
const fetchDeviceList = async () => {
  loading1.value = true
  console.log('重新请求')
  send({
    method: 'getDeviceList',
    id: 1,
    token: app.token,
    params: {},
  })
}
</script>

<style lang="scss" scoped>
:deep(.n-button__content) {
  width: 100%;
}
</style>
