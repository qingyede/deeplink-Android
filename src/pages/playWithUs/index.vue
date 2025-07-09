<template>
  <div class="px-[16px] rounded-lg">
    <div class="flex items-center justify-between gap-4">
      <n-button
        v-for="(item, index) in btnData"
        :key="index"
        @click="changeBtn(index)"
        type="primary"
        :ghost="active !== index"
        class="flex-1 rounded-lg min-h-[40px]"
        >{{ item.title }}</n-button
      >
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

// 顶部按钮数据
const btnData = computed(() => {
  return [
    {
      title: t('playWithUs.play_with_us'),
      ghost: true,
    },
    {
      title: t('playWithUs.game_news'),
      ghost: false,
    },
    {
      title: t('playWithUs.partners'),
      ghost: false,
    },
  ]
})

// 切换模式
const changeBtn = (index: number) => {
  if (index === 0) {
    router.push({ name: 'palyIndex' })
  } else if (index === 1) {
    router.push({ name: 'newsList' })
  } else {
    router.push({ name: 'Partner' })
  }
}

// 当前选中的按钮
const active = computed(() => {
  if (route.name === 'palyIndex') {
    return 0
  } else if (route.name === 'newsList') {
    return 1
  } else {
    return 2
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
