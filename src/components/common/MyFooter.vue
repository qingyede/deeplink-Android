<template>
  <div
    :style="{ paddingBottom: safeAreaBottom }"
    class="w-full !h-full flex items-center justify-between px-[22px] pt-5 rounded-t-lg shadow-top transition-colors duration-300"
    :class="['bg-[var(--bgc1)] text-[var(--text-color1)]']"
  >
    <div
      v-for="(item, index) in tabs"
      :key="index"
      class="item flex flex-col justify-center items-center gap-1 cursor-pointer relative pb-2 group"
      :class="{
        'text-[#03C188]': activeTab === index,
      }"
      @click="tabClick(index)"
    >
      <Icon
        :icon="item.icon"
        class="text-[30px] transition-all duration-300 mt-1"
        :class="{ 'scale-110': activeTab === index }"
      />
      <span class="text-xs transition-colors duration-300">
        {{ $t(item.name) }}
      </span>
      <!-- 选中时的底部横线 -->
      <div
        class="absolute top-[-10px] left-1/2 transform -translate-x-1/2 w-9 h-1 bg-[#03C188] rounded-full transition-all duration-300"
        :class="{
          'scale-0 opacity-0': activeTab !== index,
          'scale-100 opacity-100': activeTab === index,
        }"
      ></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { appStore } from '@/store/Modules/app/index'
import { useSafeAreaFooter } from '@/hooks/common/useSafeAreaFooter'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const { safeAreaBottom } = useSafeAreaFooter()
const app = appStore()
const router = useRouter()
const route = useRoute()
// const activeTab = computed(() => {
//   if (route.name === 'home') {
//     return 0
//   } else if (route.name === 'Remote') {
//     return 1
//   } else if (
//     route.name === 'CloudComputers' ||
//     route.name === 'CloudCafe' ||
//     route.name === 'CloudComputersList' ||
//     route.name === 'CloudCafeList'
//   ) {
//     return 2
//   } else if (route.name === 'DeviceList') {
//     return 3
//   } else if (route.name === 'Settings') {
//     return 4
//   } else {
//     return 0
//   }
// })

const activeTab = computed(() => {
  if (route.name === 'home') {
    return 0
  } else if (route.name === 'Remote') {
    return 1
  } else if (route.name === 'DeviceList') {
    return 2
  } else if (route.name === 'Settings') {
    return 3
  } else {
    return 0
  }
})
const tabs = computed(() => {
  return [
    { name: 'app.wallet', icon: 'mdi:wallet', path: 'home' },
    { name: 'app.remote', icon: 'mdi:remote-desktop', path: 'Remote' },
    // { name: 'app.gpu', icon: 'bxs-joystick', path: 'GPU' },
    { name: 'app.deviceList', icon: 'mdi:devices', path: 'DeviceList' },
    { name: 'app.settings', icon: 'mdi:cog', path: 'Settings' }, // ← 新增设置项
  ]
})
// 点击tab
const tabClick = (index: number) => {
  // activeTab.value = index
  // if (app.isWalletRegistered) {
  //   router.push({ name: tabs.value[index].path })
  // }
  if (!app.isWalletRegistered) {
    if (index === 0 || index === 3) {
      window.$message?.warning(t('app.pleaseCreateWalletFirst'))
      router.push({ name: 'IsWallet' })
    } else {
      router.push({ name: tabs.value[index].path })
    }
  } else {
    router.push({ name: tabs.value[index].path })
  }
}
</script>

<style lang="scss" scoped>
.shadow-top {
  box-shadow: 0 -4px 6px -1px rgba(0, 0, 0, 0.1);
}

/* 可选：添加悬停效果 */
.item:hover {
  @apply text-[#03C188]/80;
}
</style>
