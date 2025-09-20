<template>
  <div class="mt-[17px]">
    <n-tabs type="line" animated v-model:value="home.activeTab">
      <!-- Crypto Tab -->
      <n-tab-pane name="Crypto" :tab="$t('home.crypto')">
        <div
          class="flex justify-between items-center py-3 hover:bg-primary-500 transition px-2 rounded-md"
          v-for="(item, index) in props.cryptoData"
          :key="'crypto' + index"
          @click="router.push({ name: 'transferHistory', query: { coin: item.coin } })"
        >
          <div class="flex items-center gap-3">
            <div class="rounded-full overflow-hidden bg-slate-600">
              <img
                v-if="item.coin !== 'DLP'"
                :class="item.coin === 'DBC' ? 'scale-125' : ''"
                class="object-cover w-[52px] h-[52px]"
                :src="item.icon"
                alt=""
              />

              <div
                v-else
                class="flex items-center justify-center w-[52px] h-[52px] rounded-full bg-gray-200 text-gray-800 font-bold text-base"
              >
                DLP
              </div>
            </div>
            <span class="font-bold text-xl dark:text-white">{{ item.coin }}</span>
          </div>
          <div class="flex flex-col gap-1 justify-end items-end">
            <span class="font-bold text-[17px] dark:text-white">{{ item.number }}</span>
            <span class="font-bold text-[12px] text-[#7E7E7E] dark:text-white/60">{{ item.price }}</span>
          </div>
        </div>
      </n-tab-pane>

      <!-- NFTs Tab -->
      <n-tab-pane name="NFTs" :tab="app.mode ? $t('home.nfts2') : $t('home.nfts')">
        <MyNftList />
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useOpenExternalLink } from '@/hooks/common/useExternalLinkOptions'
import { useHomeStore } from '@/store/Modules/home/index'
import MyNftList from './my-nft-list.vue'
import { useBuyNftStore } from '@/store/Modules/buyNft/index'
import { appStore } from '@/store/Modules/app/index'

const app = appStore()
const buyNft = useBuyNftStore()
const { openExternalLink } = useOpenExternalLink()
const home = useHomeStore()
const router = useRouter()
const route = useRoute()
const props = defineProps<{
  cryptoData: any[]
}>()
</script>

<style lang="scss" scoped>
:deep(.n-tabs-tab__label) {
  font-weight: bold !important;
  font-size: 16px;
}

:deep(.n-tabs-tab__label) {
  font-weight: bold !important;
  font-size: 16px;
}
:deep(.n-input__input-el) {
  height: 100% !important;
}

:deep(.n-input .n-input__placeholder) {
  padding-left: 10px;
}
</style>
