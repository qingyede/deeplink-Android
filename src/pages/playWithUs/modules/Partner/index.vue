<template>
  <div class="my-6 grid grid-cols-2 gap-5">
    <!-- 加载中：骨架屏 -->
    <template v-if="remote.cardList.loading3">
      <div v-for="n in 6" :key="'skeleton-' + n" class="flex flex-col gap-3 py-3">
        <n-skeleton height="144px" :sharp="false" class="rounded-[8.74px]" />
        <n-skeleton text width="70%" />
        <n-skeleton text width="40%" />
      </div>
    </template>

    <!-- 无数据 -->
    <template v-else-if="!remote.cardList.card3 || remote.cardList.card3.length === 0">
      <div class="col-span-2">
        <n-empty description="暂无数据" />
      </div>
    </template>

    <!-- 正常数据 -->
    <template v-else>
      <div
        v-for="(item, index) in remote.cardList.card3"
        :key="index"
        class="flex flex-col gap-3 py-3 min-h-[250px] justify-between"
      >
        <img :src="item.imgurl || defaultImg" class="w-full h-[144px] object-cover rounded-[8.74px]" alt="图片" />
        <div class="text-base text-gray-600 line-clamp-2 break-words">
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
import defaultImg from '@/assets/img/playwith.png'
import { useOpenExternalLink } from '@/hooks/common/useExternalLinkOptions'

const { openExternalLink } = useOpenExternalLink()
const { t } = useI18n()
const remote = useRemoteStore()

// 初始化请求卡片数据（合作伙伴）
remote.playWithUsH3({ type: 'partner_ship' })
</script>

<style lang="scss" scoped></style>
