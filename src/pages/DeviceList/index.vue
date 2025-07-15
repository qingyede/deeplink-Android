<template>
  <div class="px-[16px]">
    <!-- 顶部按钮 -->
    <n-button class="w-full rounded-lg min-h-[48px] mb-[50px]" type="primary" round>
      <span class="text-lg w-full"> {{ $t('devices.devices') }}</span>
    </n-button>

    <!-- 可用设备 -->
    <n-card :title="titleH1" class="rounded-lg mb-8 dark:bg-[#1e1e1e] transition-colors duration-300" content-class="!px-4">
      <div class="flex flex-col gap-2" v-if="loading1">
        <n-button
          v-for="(item, index) in deviceList"
          :key="index"
          :loading="item.loading"
          color="#E1EBE7"
          class="rounded-lg min-h-[55px] w-full dark:bg-[#2c2c2c] transition-colors duration-300"
          @dblclick="rentDevice(item, 0)"
          @click="showInfo(item, 0)"
        >
          <div class="flex justify-between w-full gap-8">
            <div class="flex items-center gap-2 flex-1 justify-center">
              <div class="rounded-lg bg-white dark:bg-[#444] w-8 h-8 p-1">
                <Icon :icon="item.icon" class="text-[22px]" />
              </div>
              <span class="text-sm md:text-base font-bold text-black dark:text-white">
                {{ item.name }}
              </span>
            </div>
            <div class="flex items-center gap-1 flex-1 justify-center">
              <Icon
                icon="mdi:circle-slice-8"
                class="text-[28px] mr-1 animate-pulse"
                :style="{ color: item.statusValue == 'Online' ? 'green' : 'red' }"
              />
              <span class="text-base text-[#615F63] dark:text-white/70">
                {{ item.status }}
              </span>
            </div>
          </div>
        </n-button>
      </div>

      <div v-else class="flex flex-col gap-3">
        <n-skeleton class="rounded-lg" size="large" />
        <n-skeleton class="rounded-lg" size="large" />
        <n-skeleton class="rounded-lg" size="large" />
        <n-skeleton class="rounded-lg" size="large" />
      </div>
    </n-card>

    <!-- 我的设备 -->
    <n-card :title="titleH2" class="rounded-lg dark:bg-[#1e1e1e] transition-colors duration-300" content-class="!px-4">
      <div v-if="deviceListStore.loading" class="flex flex-col gap-3">
        <n-skeleton class="rounded-lg" size="large" />
        <n-skeleton class="rounded-lg" size="large" />
        <n-skeleton class="rounded-lg" size="large" />
        <n-skeleton class="rounded-lg" size="large" />
      </div>

      <div v-else-if="deviceListStore.deviceList.length > 0" class="flex flex-col gap-2">
        <n-button
          v-for="(item, index) in deviceListStore.deviceList"
          :key="index"
          :loading="item.loading"
          color="#E1EBE7"
          class="rounded-lg min-h-[55px] w-full dark:bg-[#2c2c2c] transition-colors duration-300"
          @dblclick="rentDevice(item, 1)"
          @click="showMyDeviceInfo(item)"
        >
          <div class="flex justify-between w-full gap-8">
            <div class="flex items-center gap-6 flex-1 justify-start">
              <div class="rounded-lg bg-white dark:bg-[#444] w-8 h-8 p-1">
                <Icon :icon="item.icon" class="text-[22px]" />
              </div>
              <div class="flex flex-col gap-1 justify-start items-start">
                <span class="text-sm md:text-base font-bold text-black dark:text-white">
                  {{ item.name }}
                </span>

                <!-- <CountdownTimer :start-time="item.rent_satrtime" :rent-seconds="item.rent_time" /> -->
              </div>
            </div>
          </div>
        </n-button>
      </div>

      <div class="my-6" v-else>
        <n-empty :description="$t('app.noData')"> </n-empty>
      </div>
    </n-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, h } from 'vue'
import { NButton, NGradientText } from 'naive-ui'
import { Icon } from '@iconify/vue'
import { useI18n } from 'vue-i18n'
import { useAppSocket } from '@/hooks/common/useAppSocket'
import { appStore } from '@/store/Modules/app'
import { iconMap } from '@/constant/APP'
import { getDeviceName } from '@/utils/common/getDeviceName'
import deviceInfoDIalog from './dialogs/deviceInfoDIalog.vue'
import { getDeviceIcon } from '@/utils/common/getDeviceIcon'
import { useDeviceListStore } from '@/store/Modules/deviceList/index'
import CountdownTimer from '@/components/common/CountdownTimer.vue'
import MyDeviceInfo from './dialogs/myDeviceInfo.vue'
import { useIntervalFn } from '@vueuse/core'
import { useRemoteStream } from '@/hooks/remote/useRemoteStream'
import { useGetEvmSignature } from '@/hooks/wallet/useGetEvmSignature'

const { getEvmSignature } = useGetEvmSignature()

const { connectToRemoteDevice } = useRemoteStream()
const app = appStore()
const { t } = useI18n()
const { connect, send, onMessage } = useAppSocket()
const deviceListStore = useDeviceListStore()
// 卡片标题组件
const titleH1 = () => {
  return h('div', { class: 'flex items-center gap-3' }, [
    h(Icon, {
      icon: 'mdi:devices',
      class: '!text-[24px] min-w-[30px] min-h-[30px] text-[#000] dark:text-white',
    }),
    h('div', { class: 'flex flex-wrap' }, [
      h('div', { class: 'flex items-start' }, [
        h(
          'div',
          { class: 'text-[#000] dark:text-white text-[14px] font-bold' },
          t('devices.deviceList') // ✅ 保留国际化
        ),
        h(
          'div',
          { class: 'text-[#737373] dark:text-white/60 text-[12px] flex-[1] ml-1' },
          t('devices.deviceStartTip') // ✅ 保留国际化
        ),
      ]),
    ]),
  ])
}
const titleH2 = () => {
  return h('div', { class: 'flex items-center gap-3' }, [
    h(Icon, {
      icon: 'mdi:devices',
      class: '!text-[24px] min-w-[30px] min-h-[30px] text-[#000] dark:text-white',
    }),
    h('div', { class: 'flex flex-wrap' }, [
      h('div', { class: 'flex items-start' }, [
        h(
          'div',
          { class: 'text-[#000] dark:text-white text-[14px] font-bold' },
          t('devices.myRentalList') // ✅ 保留国际化
        ),
        h(
          'div',
          { class: 'text-[#737373] dark:text-white/60 text-[12px] flex-[1] ml-1' },
          t('devices.deviceStartTip') // ✅ 保留国际化
        ),
      ]),
    ]),
  ])
}

// 设备列表数据
const deviceList = ref([
  {
    name: 'Device 1',
    icon: iconMap['windows'],
    status: t('devices.Online'),
    loading: false,
    statusValue: 'Online',
  },
  {
    name: 'Device 2',
    icon: iconMap['macos'],
    status: t('devices.Offline'),
    loading: false,
    statusValue: 'Offline',
  },
  {
    name: 'Device 3',
    icon: iconMap['ubuntu'],
    status: t('devices.Online'),
    loading: false,
    statusValue: 'Online',
  },
])

// 设备列表loading
let loading1 = ref(true)

// 初始化用户机器列表
const { pause, resume, isActive } = useIntervalFn(
  async () => {
    deviceListStore.getUserDeviceListH()
  },
  600000,
  { immediateCallback: true }
)

// 展示机器信息
const showInfo = (item: any, n: number) => {
  if (n === 0) {
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
          { default: () => t('设备信息') }
        )
      },
      content: () => h(deviceInfoDIalog, { item }),
      positiveText: '立即连接',
      negativeText: '解除绑定',
      positiveButtonProps: { color: '#03C188' },
      negativeButtonProps: { color: '#EF4444', loading: negativeButtonPropsLoading.value },
      onPositiveClick: () => {},
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
      class: 'rounded-2xl dark:bg-[#1a1a1a] dark:text-white',
      showIcon: false,
    })
  } else {
    // 展示我的机器信息
    console.log(item)
  }
}
// 租用设备
const rentDevice = (item: any, n: number) => {
  if (n === 0) {
    // 租用设备
    item.loading = true
    if (item.status === 'Online') {
      item.status = 'Offline'
    } else {
      item.status = 'Online'
    }
    setTimeout(() => {
      item.loading = false
      window.$message?.success('租用成功')
    }, 2000)
  } else {
    // 租用我的设备
    item.loading = true
    if (item.status === 'Online') {
      item.status = 'Offline'
    } else {
      item.status = 'Online'
    }
    setTimeout(() => {
      item.loading = false
      window.$message?.success('租用成功')
    }, 2000)
  }
}

// onMounted(() => {
//   connect()

//   //  绑定设备
//   const device_name = getDeviceName()

//   send({
//     method: 'bindDevice',
//     id: 1,
//     token: app.token,
//     params: { device_id: app.deviceInfo.device_id, device_name },
//   })

//   // 注册消息监听处理
//   onMessage((event) => {
//     try {
//       const message = JSON.parse(event.data)
//       console.log(message, '???????')
//       if (message.method === 'getDeviceList' || message.method === 'notifyDevice') {
//         if (message.result.device_list) {
//           deviceList.value = message.result.device_list.map((item: any) => {
//             return {
//               name: item.device_name,
//               icon: getDeviceIcon(item.device_name),
//               status: t('devices.Online'),
//               loading: false,
//               statusValue: item.online ? 'Online' : 'Offline',
//               deviceCode: item.device_id,
//             }
//           })
//           loading1.value = true
//         } else {
//           deviceList.value = []
//         }
//         console.log(deviceList.value, '拿到设备列表了')
//       }

//       if (message.method === 'registerDevice') {
//         console.log('[WS] 设备注册成功:', message.result)
//       }

//       if (message.method === 'bindDevice') {
//         console.log('[WS] 设备绑定成功:', message.result)
//       }
//     } catch (err) {
//       console.error('[WS] 消息解析失败:', err)
//     }
//   })

//   // 延迟请求，避免连接未就绪
//   setTimeout(() => {
//     fetchDeviceList()
//   }, 10)
// })

// 发送请求：获取设备列表
const fetchDeviceList = async () => {
  loading1.value = false
  if (app.deviceInfo) {
    send({
      id: 1,
      method: 'imOnline',
      token: app.token,
      params: { device_id: app.deviceInfo.device_id },
    })

    send({
      method: 'getDeviceList',
      id: 1,
      token: app.token,
      params: {},
    })
  }
}

// 展示我的租用机器信息
const showMyDeviceInfo = (item) => {
  const MyDeviceInfoDialogRef = ref()
  const d = window.$dialog?.info({
    title: () => {
      return h(
        NGradientText,
        {
          size: 24,
          type: 'success',
          class: 'font-bold',
        },
        { default: () => t('devices.deviceDetails') }
      )
    },
    content: () => h(MyDeviceInfo, { ref: MyDeviceInfoDialogRef, info: item }),
    class: 'rounded-2xl dark:bg-[#1a1a1a] dark:text-white',
    showIcon: false,
    negativeButtonProps: { color: '#3CD8A6', size: 'medium' },
    positiveButtonProps: { color: '#03C188', size: 'medium' },
    positiveText: t('devices.connectDevice'),
    negativeText: t('app.cancel'),
    onPositiveClick: async () => {
      if (d) {
        d.loading = true
        d.positiveText = 'loading...'

        const rs: any = await getEvmSignature()
        console.log(rs, '签名签名签名签名')
        d.loading = false
        d.positiveText = t('devices.connectDevice')
        if (rs) {
          console.log({ id: item.device_id, password: `evm.renter.${app.address}.${rs.nonce}.${rs.signature}` }, '关键信息')
          try {
            connectToRemoteDevice({ id: item.device_id, password: `evm.renter.${app.address}.${rs.nonce}.${rs.signature}` })
            d.destroy?.()
          } catch (error) {
            return false
          }
        } else {
          return false
        }
      }
    },
  })
}
</script>

<style lang="scss" scoped>
:deep(.n-button__content) {
  width: 100%;
}
</style>
