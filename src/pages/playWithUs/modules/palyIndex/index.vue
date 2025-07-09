<template>
  <div class="my-6 grid grid-cols-2 gap-5">
    <!-- 加载中：骨架屏 -->
    <template v-if="remote.cardList.loading1">
      <div v-for="n in 4" :key="'skeleton-' + n" class="flex flex-col gap-3 py-3">
        <n-skeleton height="144px" :sharp="false" class="rounded-[8.74px]" />
        <n-skeleton text width="70%" />
        <n-skeleton text width="40%" />
      </div>
    </template>

    <!-- 数据为空 -->
    <template v-else-if="!remote.cardList.card1 || remote.cardList.card1.length === 0">
      <div class="col-span-2">
        <n-empty description="暂无数据" />
      </div>
    </template>

    <!-- 正常数据展示 -->
    <template v-else>
      <div
        class="flex flex-col gap-3 py-3 min-h-[250px] justify-between"
        v-for="(item, index) in remote.cardList.card1"
        :key="index"
      >
        <div>
          <img :src="item.imgurl" class="w-full h-[144px] object-cover rounded-[8.74px]" alt="" />
        </div>

        <!-- 限制最多两行，防止撑高 -->
        <div class="text-base text-gray-600 line-clamp-5 break-words">
          {{ item.name }}
        </div>

        <n-button @click="openExternalLink(item.link)" class="max-w-[100px] rounded-[6px] text-sm" type="primary">
          {{ $t('playWithUs.watch_me') }}
        </n-button>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { useRemoteStore } from '@/store/Modules/remote/index'
import { useOpenExternalLink } from '@/hooks/common/useExternalLinkOptions'

const { openExternalLink } = useOpenExternalLink()
const { t } = useI18n()
const remote = useRemoteStore()

// 初始化列表数据
remote.playWithUsH1({ type: 'play_with_us' })
</script>

<style lang="scss" scoped>
/* 确保 Tailwind 配置中启用了 line-clamp 插件 */
</style>
