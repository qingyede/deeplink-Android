<template>
  <div class="px-[16px] rounded-lg">
    <!-- 顶部按钮 -->
    <!-- <n-button
      v-for="(item, index) in btnData"
      :key="index"
      @click="changeBtn(index)"
      type="primary"
      :ghost="active !== index"
      class="w-full rounded-lg min-h-[48px]"
      round
    >
      <span class="text-lg w-full"> {{ item.title }}</span>
    </n-button> -->
    <RouterView />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
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
      title: t('Store.deepLinkNFTs'),
      ghost: true,
    },
    // {
    //   title: t('Store.partnerProduct'),
    //   ghost: false,
    // },
  ]
})

// 切换模式
const changeBtn = (index: number) => {
  active.value = index
  if (index === 0) {
    router.push({ name: 'nfts' })
  } else {
    router.push({ name: 'PartnerProduct' })
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
