<template>
  <div class="px-[16px] rounded-lg">
    <div class="flex flex-wrap gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide scroll-smooth">
      <n-button
        v-for="(item, index) in btnData"
        :key="index"
        size="small"
        @click="changeBtn(index)"
        type="primary"
        :ghost="active !== index"
        class="flex-1 rounded-lg min-h-[40px]"
      >
        {{ item.title }}
      </n-button>
    </div>
    <RouterView />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { RouterView } from 'vue-router'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const router = useRouter()
const route = useRoute()
// 当前选中的按钮
const active = ref(0)
// 顶部按钮数据
const btnData = computed(() => {
  return [
    {
      title: t('shareGpu.gpuEarnReward'),
      ghost: true,
    },
    {
      title: t('shareGpu.miningNodeNFT'),
      ghost: false,
    },
    {
      title: t('shareGpu.rentToEarn'),
      ghost: false,
    },
  ]
})

// 切换模式
const changeBtn = (index: number) => {
  active.value = index
  if (index === 0) {
    router.push({ name: 'shareIndex' })
  } else if (index === 1) {
    router.push({ name: 'miningNft' })
  } else {
    router.push({ name: 'shareGpuReward' })
  }
}
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
