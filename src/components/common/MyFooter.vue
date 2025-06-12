<template>
  <div class="h-full flex items-center justify-between px-[22px] py-6 bg-white rounded-t-lg shadow-top text-[#000000]/50">
    <div
      v-for="(item, index) in tabs"
      :key="index"
      class="item flex flex-col justify-center items-center gap-1 cursor-pointer relative pb-2 group"
      :class="{ 'text-[#03C188]': activeTab === index }"
      @click="tabClick(index)"
    >
      <Icon
        :icon="item.icon"
        class="text-[30px] transition-all duration-300 mt-1"
        :class="{ 'scale-110': activeTab === index }"
      />
      <span class="text-xs transition-colors duration-300">{{ item.name }}</span>
      <!-- 选中时的底部横线 -->
      <div
        class="absolute top-[-10px] left-1/2 transform -translate-x-1/2 w-9 h-1 bg-[#03C188] rounded-full transition-all duration-300"
        :class="{ 'scale-0 opacity-0': activeTab !== index, 'scale-100 opacity-100': activeTab === index }"
      ></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { appStore } from '@/store/Modules/app/index'
const app = appStore()
const router = useRouter()
const route = useRoute()
const activeTab = ref(0)

const tabs = ref([
  { name: 'Wallet', icon: 'mdi:wallet', path: 'home' },
  { name: 'Remote', icon: 'mdi:remote-desktop', path: 'Remote' },
  { name: 'Rent GPU', icon: 'mdi:gpu', path: 'GPU' },
  { name: 'Device list', icon: 'mdi:devices', path: 'DeviceList' },
])
// 点击tab
const tabClick = (index: number) => {
  activeTab.value = index
  if (app.isWalletRegistered) {
    router.push({ name: tabs.value[index].path })
  }
}
</script>

<style lang="scss" scoped>
.shadow-top {
  box-shadow: 0 -4px 6px -1px rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
}

/* 可选：添加悬停效果 */
.item:hover {
  @apply text-[#03C188]/80;
}
</style>
