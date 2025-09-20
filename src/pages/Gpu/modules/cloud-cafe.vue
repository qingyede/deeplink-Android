<template>
  <div class="my-4">
    <n-collapse>
      <n-collapse-item name="1">
        <template #header-extra>
          <div class="flex items-center gap-1">
            <span class="text-sm text-gray-500 dark:text-gray-400">{{ $t('gpu.title') }}</span>
            <Icon icon="mdi:alert-circle-outline" class="text-[20px] text-gray-500" />
          </div>
        </template>
        <div class="text-sm leading-6 dark:text-gray-400">
          {{ $t(`gpu.description2`) }}
        </div>
      </n-collapse-item>
    </n-collapse>
  </div>

  <!-- 选择区域 -->
  <div
    class="my-2 w-full justify-between min-h-[50px] bg-[#E1EBE7] dark:bg-[#2c2c2c] rounded-[14px] px-[15px] py-[5px] flex items-center gap-3 transition-colors duration-300"
  >
    <span class="text-[#333] dark:text-white text-nowrap">{{ $t('gpu.distance') }}</span>
    <n-select
      @update:value="updateH"
      :placeholder="$t('gpu.selectDistance')"
      v-model:value="cafe.distance"
      :options="options"
      :virtual-scroll="false"
      :menu-props="{ style: { paddingTop: '12px' } }"
    >
      >
    </n-select>
  </div>
  <h1 class="my-3 whitespace-normal break-all text-xs leading-5">{{ $t('gpu.tips') }}</h1>

  <!-- 卡片列表部分 -->
  <div>
    <!-- ✅ 骨架屏 Loading -->

    <div v-if="cafe.gpuTypeListLoading" class="flex flex-col gap-6">
      <n-skeleton class="rounded-2xl min-h-[220px]" size="large" />
      <n-skeleton class="rounded-2xl min-h-[220px]" size="large" />
      <n-skeleton class="rounded-2xl min-h-[220px]" size="large" />
      <n-skeleton class="rounded-2xl min-h-[220px]" size="large" />
    </div>

    <!-- ✅ 空数据 -->
    <n-empty
      v-else-if="cafe.gpuTypeList.length === 0"
      :description="$t('gpu.noGpuMachinesHere')"
      class="my-10 dark:text-white"
    />

    <!-- ✅ 正常数据 -->
    <n-card
      v-else
      v-for="(item, index) in cafe.gpuTypeList"
      :key="index"
      :title="item.title"
      class="rounded-lg mb-6 bg-[#e1ebe7] dark:bg-[#2c2c2c] dark:text-white transition-colors duration-300"
      hoverable
    >
      <div class="flex flex-col gap-5">
        <div class="w-full flex items-center justify-between">
          <span class="text-base max-w-[200px]">{{ $t('gpu.numberOfMachines') }}:</span>
          <n-button class="rounded-[10px] !px-2 !text-[#000] dark:!text-[#21593d]" color="#9cebcb">
            {{ item.canRentTrue }} / {{ item.num }}
          </n-button>
        </div>

        <div class="w-full flex items-center justify-between">
          <span class="text-text-lightSecondary dark:text-text-darkSecondary text-[15px]">
            {{ !app.mode ? $t('gpu.minScore') : $t('gpu.minScore2') }}
          </span>
          <div class="flex items-center gap-2 text-base text-text-lightSecondary dark:text-text-darkSecondary">
            <n-button text class="min-h-[32px] rounded-xl text-base font-bold" type="primary">
              {{ app.mode ? (convertDlcToUsd(item.minRentHour, dlc_price) * 1000).toFixed(0) : item.minRentHour
              }}{{ price.currentUnit }}
            </n-button>
          </div>
        </div>

        <n-button @click="toDetail(item)" type="primary" class="w-full rounded-lg min-h-[40px]">
          {{ $t('gpu.viewGpuList') }}
        </n-button>
      </div>
    </n-card>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { NGradientText } from 'naive-ui'
import { useRouter, useRoute } from 'vue-router'
import GetFreeTimeDialog from './GetFreeTimeDialog.vue'
import { useI18n } from 'vue-i18n'
import { convertDlcToUsd } from '@/utils/common/transferToUsd'
import { useCloudCafeStore } from '@/store/Modules/gpu/cloud-cafe'
import { appStore } from '@/store/Modules/app'
import { useGetDlcPrice } from '@/hooks/store/useGetDlcPrice'
import { priceStore } from '@/store/Modules/price/index'

const price = priceStore()
const { dlc_price } = useGetDlcPrice()
const cafe = useCloudCafeStore()
const router = useRouter()
const route = useRoute()
const app = appStore()
const { t } = useI18n()

const options = ref([
  {
    label: 'All',
    value: 'all',
  },
  {
    label: '50 km',
    value: 50,
  },
  {
    label: '100 km',
    value: 100,
  },
  {
    label: '150 km',
    value: 150,
  },
  {
    label: '200 km',
    value: 200,
  },
  {
    label: '250 km',
    value: 250,
  },
  {
    label: '300 km',
    value: 300,
  },
  {
    label: '500 km',
    value: 500,
  },
])
// 初始化类型数据
cafe.getGpuTypeH()
//当前剩余的时长
const currentFreeTime = ref(0)

// 填写邀请码获取免费时长
const getFreeTime = () => {
  const GetFreeTimeDialogRef: any = ref(null)
  const d = window.$dialog?.info({
    title: () => {
      return h(
        NGradientText,
        {
          size: 20,
          type: 'success',
          class: 'font-bold',
        },
        { default: () => t('gpu.tip') }
      )
    },
    content: () => h(GetFreeTimeDialog, { ref: GetFreeTimeDialogRef }),
    class: 'rounded-2xl dark:bg-[#1a1a1a] dark:text-white',
    showIcon: false,
    negativeButtonProps: { color: '#3CD8A6', size: 'medium' },
    positiveButtonProps: { color: '#03C188', size: 'medium' },
    positiveText: '提交',
    negativeText: '取消',
    onPositiveClick: async () => {
      console.log(88888888)

      const rs = await new Promise(async (resolve, reject) => {
        GetFreeTimeDialogRef.value?.formRef?.validate(async (errors) => {
          if (!errors) {
            resolve(true)
          } else {
            window.$message?.error(t('app.pleaseCheckYourInput'))
            resolve(false)
          }
        })
      })

      if (rs) {
        window.$message?.success(t('app.submitSuccess'))
        currentFreeTime.value = 24
      } else {
        return false
      }
    },
  })
}

const updateH = (val: number) => {
  console.log('选择了距离：', val)
  cafe.getGpuTypeH()
}

// 去详情页
const toDetail = (item: any) => {
  router.push({
    name: 'CloudCafeList',
    query: {
      type: item.type,
      longitude: cafe.longitude,
      latitude: cafe.latitude,
      distance: cafe.distance,
    },
  })
}
</script>

<style lang="scss" scoped>
.n-card {
  border-radius: 22px;
}
:deep(.n-card > .n-card-header .n-card-header__main) {
  font-weight: 600 !important;
}
:deep(.n-base-selection-label) {
  width: 100% !important;
}
</style>
