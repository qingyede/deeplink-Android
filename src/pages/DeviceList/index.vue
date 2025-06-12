<template>
  <div class="px-[16px]">
    <n-button class="w-full rounded-lg min-h-[48px] mb-[50px]" type="primary" round>
      <span class="text-lg w-full"> Devices </span>
    </n-button>
    <n-card :title="titleH1" class="rounded-lg mb-8">
      <div class="flex flex-col gap-2">
        <n-button
          :loading="item.loading"
          color="#E1EBE7"
          class="rounded-lg min-h-[55px] w-full"
          v-for="(item, index) in deviceList"
          :key="index"
          @dblclick="rentDevice(item, 0)"
        >
          <div class="flex justify-between w-full gap-8">
            <div class="flex items-center gap-2 flex-1 justify-center">
              <div class="rounded-lg bg-white w-8 h-8 p-1">
                <Icon :icon="item.icon" class="text-[22px]" />
              </div>
              <span class="text-sm md:text-base font-bold text-black">{{ item.name }}</span>
            </div>
            <div class="flex items-center gap-1 flex-1 justify-center">
              <Icon
                icon="mdi:circle-slice-8"
                class="text-[28px] mr-1 animate-pulse"
                :style="{ color: item.status == 'Online' ? 'green' : 'red' }"
              />
              <span class="text-base text-[#615F63]">{{ item.status }}</span>
            </div>
          </div>
        </n-button>
      </div>
    </n-card>

    <n-card :title="titleH2" class="rounded-lg">
      <div class="flex flex-col gap-2">
        <n-button
          :loading="item.loading"
          color="#E1EBE7"
          class="rounded-lg min-h-[55px] w-full"
          v-for="(item, index) in deviceMyList"
          :key="index"
          @dblclick="rentDevice(item, 1)"
        >
          <div class="flex justify-between w-full gap-8">
            <div class="flex items-center gap-2 flex-1 justify-center">
              <div class="rounded-lg bg-white w-8 h-8 p-1">
                <Icon :icon="item.icon" class="text-[22px]" />
              </div>
              <span class="text-sm md:text-base font-bold text-black">{{ item.name }}</span>
            </div>
            <div class="flex items-center gap-1 flex-1 justify-center">
              <Icon
                icon="mdi:circle-slice-8"
                class="text-[28px] mr-1 animate-pulse"
                :style="{ color: item.status == 'Online' ? 'green' : 'red' }"
              />
              <span class="text-base text-[#615F63]">{{ item.status }}</span>
            </div>
          </div>
        </n-button>
      </div>
    </n-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, h } from 'vue'
import { NButton } from 'naive-ui'
import { Icon } from '@iconify/vue'
// 图标映射
const iconMap: any = {
  windows: 'devicon:windows8', // Windows
  macos: 'logos:apple', // macOS
  ubuntu: 'logos:ubuntu', // Ubuntu
  debian: 'logos:debian', // Debian
  fedora: 'logos:fedora', // Fedora
  redhat: 'logos:redhat', // Red Hat
  centos: 'logos:centos-icon', // CentOS
  arch: 'logos:archlinux', // Arch Linux
  android: 'devicon:android', // Android
  ios: 'logos:apple', // iOS
  chromeos: 'simple-icons:googlechrome', // Chrome OS
  opensuse: 'logos:opensuse', // openSUSE
  manjaro: 'logos:manjaro', // Manjaro
  linuxmint: 'logos:linux-mint', // Linux Mint
  kali: 'simple-icons:kalilinux', // Kali Linux
  alpine: 'simple-icons:alpinelinux', // Alpine Linux
  oraclelinux: 'logos:oracle', // Oracle Linux
  raspbian: 'logos:raspberry-pi', // Raspbian
  solaris: 'logos:solarwinds', // Solaris (尝试使用 logos 库中的 sun 图标)
  freebsd: 'logos:freebsd', // FreeBSD
}
// 卡片标题组件
const titleH1 = () => {
  return h('div', { class: 'flex items-center gap-3 ' }, [
    h(Icon, {
      icon: 'mdi:devices',
      class: ' !text-[24px]  min-w-[30px] min-h-[30px] ',
    }),
    h('div', { class: 'flex flex-wrap ' }, [
      h('div', { class: ' flex items-start' }, [
        h('div', { class: 'text-[#000] text-[14px] font-bold' }, 'Device List '),
        h(
          'div',
          { class: 'text-[#737373] text-[12px] flex-[1] ml-1' },
          '(Double-click to start remote control of the device)'
        ),
      ]),
    ]),
  ])
}
const titleH2 = () => {
  return h('div', { class: 'flex items-center gap-3 ' }, [
    h(Icon, {
      icon: 'mdi:devices',
      class: ' !text-[24px]  min-w-[30px] min-h-[30px] ',
    }),
    h('div', { class: 'flex flex-wrap ' }, [
      h('div', { class: ' flex items-start' }, [
        h('div', { class: 'text-[#000] text-[14px] font-bold' }, 'My Rental List'),
        h(
          'div',
          { class: 'text-[#737373] text-[12px] flex-[1] ml-1' },
          '(Double-click to start remote control of the device)'
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
    status: 'Online',
    loading: false,
  },
  {
    name: 'Device 2',
    icon: iconMap['macos'],
    status: 'Offline',
    loading: false,
  },
  {
    name: 'Device 3',
    icon: iconMap['ubuntu'],
    status: 'Online',
    loading: false,
  },
])

const deviceMyList = ref([
  {
    name: 'Device 1',
    icon: iconMap['windows'],
    status: 'Online',
    loading: false,
  },
  {
    name: 'Device 2',
    icon: iconMap['macos'],
    status: 'Offline',
    loading: false,
  },
  {
    name: 'Device 3',
    icon: iconMap['ubuntu'],
    status: 'Online',
    loading: false,
  },
])

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
</script>

<style lang="scss" scoped>
:deep(.n-button__content) {
  width: 100%;
}
</style>
