<template>
  <div class="my-6">
    <n-collapse>
      <n-collapse-item name="1">
        <template #header-extra>
          <div class="flex items-center gap-1">
            <span class="text-sm text-gray-500">{{ $t('gpu.learnMoreGpuRental') }}</span>
            <Icon icon="mdi:alert-circle-outline" class="text-[20px] text-gray-500" />
          </div>
        </template>
        <div class="text-sm leading-6">
          {{ $t(`gpu.description2`) }}
        </div>
      </n-collapse-item>
    </n-collapse>
  </div>

  <!-- 列表 -->
  <div class="flex flex-col gap-6">
    <div v-if="cafe.gpuListLoading" class="flex flex-col gap-5">
      <div v-for="index in 4" :key="index" class="flex-1 border-t border-gray-300 px-[10px] py-[21px]">
        <div class="flex items-center gap-3 bg-[#D7EDEB] dark:bg-[#2c2c2c] rounded-[9px] px-[12px] py-[13px]">
          <n-skeleton :width="54" :height="54" circle />
          <n-skeleton :width="220" :height="20" />
        </div>

        <div class="flex flex-col gap-4 mt-4">
          <div class="flex justify-between items-center">
            <n-skeleton :width="100" :height="18" />
            <n-skeleton :width="80" :height="18" />
          </div>

          <div class="flex justify-between items-center">
            <n-skeleton :width="80" :height="18" />
            <n-skeleton :width="180" :height="18" />
          </div>

          <div class="flex justify-between items-center">
            <n-skeleton :width="100" :height="18" />
            <n-skeleton :width="50" :height="18" />
          </div>

          <div class="flex justify-between items-center">
            <n-skeleton :width="100" :height="18" />
            <n-skeleton :width="120" :height="18" />
          </div>

          <div class="flex justify-between items-center">
            <n-skeleton :width="100" :height="18" />
            <n-skeleton :width="160" :height="32" />
          </div>

          <div class="flex justify-between items-center">
            <n-skeleton :width="100" :height="18" />
            <n-skeleton :width="40" :height="18" />
          </div>

          <div class="flex items-center gap-4 mt-3">
            <n-skeleton class="flex-1 h-[46px] rounded-lg" />
            <n-skeleton class="flex-1 h-[46px] rounded-lg" />
          </div>
        </div>
      </div>
    </div>
    <div
      v-else-if="cafe.gpuList.length > 0"
      class="flex-1 border-t border-gray-300 px-[10px] py-[21px]"
      v-for="(item, index) in cafe.gpuList"
      :key="index"
    >
      <div class="flex items-center gap-3 bg-[#D7EDEB] dark:bg-[#2c2c2c] rounded-[9px] px-[12px] py-[13px]">
        <Icon icon="mdi:gas-station" class="w-[54px] h-[54px] text-primary-500" />
        <span class="text-[16px] font-semibold">{{
          `${removeGeForceRTX(item.machineInfo.gpu_type)}
        
        
        (${item.device_id})`
        }}</span>
      </div>
      <!-- 内容 -->
      <div class="flex flex-col gap-4 mt-4">
        <div class="flex justify-between items-center">
          <span class="font-bold text-base">{{ $t('gpu.machineStatus') }}:</span>
          <span class="font-bold text-sm text-primary-500">{{ $t(`gpu.${item.rsStatus()}`) }}</span>
        </div>

        <div class="flex justify-between items-center">
          <span class="font-bold text-base">{{ $t('gpu.memory') }}:</span>
          <span class="font-semibold text-sm text-[#717171]">{{ item.machineInfo.total_mem }}G</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="font-bold text-base">{{ $t('gpu.availableDuration') }}:</span>
          <span class="font-semibold text-sm text-primary-500">{{ item.canUseTime }}</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="font-bold text-base">{{ $t('gpu.rentalFee') }}:</span>

          <n-button text type="primary" class="rounded-lg font-semibold text-sm">{{
            app.mode
              ? `${price.dlc2usd(item.rent_hour_dlcprice).points}${price.currentUnit} ≈ ${
                  price.dlc2usd(item.rent_hour_dlcprice).localPrice
                }`
              : `${item.rent_hour_dlcprice}${price.currentUnit} ≈ ${price.useLocalizedCurrency(
                  convertDlcToUsd(item.rent_hour_dlcprice, dlc_price)
                )}`
          }}</n-button>
        </div>

        <div class="flex items-center gap-4 mt-3">
          <n-button
            @click="rentH(item)"
            :loading="item.loading"
            :disabled="item.rsStatus() !== 'vacant'"
            type="primary"
            class="flex-1 rounded-lg min-h-[46px]"
          >
            {{ item.rsStatus() === 'notRentable' ? $t(`gpu.${item.rsStatus()}`) : $t('gpu.rent') }}
          </n-button>
        </div>
      </div>
    </div>
    <div class="my-6" v-else>
      <n-empty :description="$t('gpu.noData')">
        <template #extra>
          <n-button size="small"> {{ $t('gpu.noGPUData') }} </n-button>
        </template>
      </n-empty>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useCloudCafeStore } from '@/store/Modules/gpu/cloud-cafe'
import { useRouter, useRoute } from 'vue-router'
import { priceStore } from '@/store/Modules/price/index'
import { convertDbcToUsd, convertDlcToUsd } from '@/utils/common/transferToUsd'
import { useGetDlcPrice } from '@/hooks/store/useGetDlcPrice'
import { NGradientText } from 'naive-ui'
import testNetDialog from './testNetDialog.vue'
import { removeGeForceRTX } from '@/utils/common/removeGeForceRTX'
import { useI18n } from 'vue-i18n'
import { useIntervalFn } from '@vueuse/core'
import { useCloudComputersStore } from '@/store/Modules/gpu/cloud-computers'
const cloudComputersStore = useCloudComputersStore()
import { appStore } from '@/store/Modules/app'
const app = appStore()

const { t } = useI18n()
const { dlc_price } = useGetDlcPrice()
const price = priceStore()
const router = useRouter()
const route = useRoute()
const cafe = useCloudCafeStore()

// 初始化列表
cafe.getGpuListH({
  type: route.query.type,
  longitude: route.query.longitude,
  latitude: route.query.latitude,
  distance: route.query.distance,
})

// 测试网络延迟
const testNet = (item: any) => {
  console.log(item)
  const d = window.$dialog?.info({
    title: () => {
      return h(
        NGradientText,
        {
          size: 20,
          type: 'success',
          class: 'font-bold',
        },
        { default: () => t('gpu.testNetworkLatency') }
      )
    },
    content: () => h(testNetDialog),
    class: 'rounded-2xl dark:bg-[#1a1a1a] dark:text-white',

    showIcon: false,
    negativeButtonProps: { color: '#3CD8A6', size: 'medium' },
    positiveButtonProps: { color: '#03C188', size: 'medium' },
    negativeText: '取消',
    onPositiveClick: async () => {
      console.log(88888888)
    },
  })
}

// 租用
const rentH = async (item: any) => {
  if (app.isWalletRegistered) {
    console.log(item, '租用信息')
    // 先判断机器状态是否在线
    const rs = await cloudComputersStore.getMachineStatusH(item.machine_id, item)
    if (rs) {
      cloudComputersStore.rentMachineDialogBeforeForm.rentinfo = item
      cloudComputersStore.rentMachineDialogBefore(item)
    }
  } else {
    window.$message?.warning(t('app.pleaseCreateWalletFirst'))
    router.push({ name: 'openWallet' })
  }
}
</script>

<style lang="scss" scoped></style>
