<template>
  <div class="px-[16px] rounded-lg">
    <div class="flex items-center justify-between gap-6 sticky top-0 left-0 z-[99999] bg-white dark:bg-[#1e1e1e]">
      <!-- :ghost="activeIndex !== index" -->
      <!-- class="flex-1 rounded-lg min-h-[40px]" -->

      <n-button
        v-for="(item, index) in btnData"
        :key="index"
        @click="changeBtn(index)"
        type="primary"
        class="w-full rounded-lg min-h-[48px]"
        >{{ item.title }}</n-button
      >
    </div>
    <!-- 强制刷新路由组件 -->
    <RouterView :key="cloudComputersStore.RouterViewKey" />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { RouterView } from 'vue-router'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
import { useCloudComputersStore } from '@/store/Modules/gpu/cloud-computers'
const cloudComputersStore = useCloudComputersStore()

const router = useRouter()
const route = useRoute()
// 顶部按钮数据
const btnData = computed(() => {
  return [
    // {
    //   title: t('gpu.cloudComputers'),
    //   ghost: true,
    // },
    {
      title: t('gpu.cloudCafe'),
      ghost: false,
    },
  ]
})

// 切换模式
const changeBtn = (index: number) => {
  // if (index === 0) {
  //   router.push({ name: 'CloudComputers' })
  // } else {
  //   router.push({ name: 'CloudCafe' })
  // }
}

// 计算属性之active当前选中的按钮
const activeIndex = computed(() => {
  if (route.name === 'CloudComputers' || route.name === 'CloudComputersList') {
    return 0
  } else {
    return 1
  }
})
</script>

<style lang="scss" scoped>
:deep(.n-base-selection .n-base-selection-label) {
  background: #d6e6db !important;
  width: 130px;
  height: 40px;
  border-radius: 10px;
}

:deep(.n-base-selection .n-base-selection__border, .n-base-selection .n-base-selection__state-border) {
  border: 0 !important;
}
</style>
