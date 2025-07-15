<template>
  <div class="my-4">
    <n-collapse>
      <n-collapse-item name="1">
        <template #header-extra>
          <div class="flex items-center gap-1">
            <span class="text-sm text-gray-500">{{ $t('gpu.title') }}</span>
            <Icon icon="mdi:alert-circle-outline" class="text-[20px] text-gray-500" />
          </div>
        </template>
        <div class="text-sm leading-6">
          {{ $t(`gpu.game_tip`) }}
        </div>
      </n-collapse-item>
    </n-collapse>
  </div>
  <!-- Select 控件容器 -->

  <div
    class="min-h-[50px] w-full rounded-[14px] px-[15px] py-[5px] flex items-center justify-between gap-3 bg-[#E1EBE7] dark:bg-[#2c2c2c] text-[#333] dark:text-white"
  >
    <span class="text-nowrap">{{ $t('gpu.distance') }}</span>

    <n-select
      class="dark:text-black"
      :placeholder="$t('gpu.selectDistance')"
      v-model:value="cloudComputersStore.distance"
      @update:value="updateH"
      :options="options"
    />
    <n-button @click="getFreeTime" type="primary" class="max-w-[100px] rounded-lg min-h-[46px] ml-4">
      <span class="text-[12px] md:text-[14px]">
        {{ currentFreeTime === 24 ? `剩余:${currentFreeTime}小时` : $t('gpu.inputInviteCode') }}
      </span>
    </n-button>
  </div>
  <div class="flex items-center gap-1 my-4">
    <span class="text-[10px] md:text-[13px] text-gray-400"> {{ $t('gpu.distanceWarning') }} </span>
  </div>

  <!-- 卡片列表部分 -->
  <div>
    <!-- ✅ 骨架屏 Loading -->

    <div v-if="cloudComputersStore.gpuTypeListLoading" class="flex flex-col gap-6">
      <n-skeleton class="rounded-2xl min-h-[220px]" size="large" />
      <n-skeleton class="rounded-2xl min-h-[220px]" size="large" />
      <n-skeleton class="rounded-2xl min-h-[220px]" size="large" />
      <n-skeleton class="rounded-2xl min-h-[220px]" size="large" />
    </div>

    <!-- ✅ 空数据 -->
    <n-empty
      v-else-if="cloudComputersStore.gpuTypeList.length === 0"
      :description="$t('gpu.noGpuMachinesHere')"
      class="my-10 dark:text-white"
    />

    <!-- ✅ 正常数据 -->
    <n-card
      v-else
      v-for="(item, index) in cloudComputersStore.gpuTypeList"
      :key="index"
      :title="item.title"
      class="rounded-lg mb-6 bg-[#e1ebe7] dark:bg-[#2c2c2c] dark:text-white transition-colors duration-300"
      hoverable
    >
      <div class="flex flex-col gap-10">
        <div class="w-full flex items-center justify-between">
          <span class="text-base max-w-[200px]">{{ $t('gpu.numberOfMachines') }}:</span>
          <n-button class="rounded-[10px] !px-2 !text-[#000] dark:!text-[#21593d]" color="#9cebcb">
            {{ item.num }}
            <!-- <span class="text-xs mt-1 ml-[2px]">{{ $t('gpu.piece') }}</span> -->
          </n-button>
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
import { useRouter, useRoute } from 'vue-router'
import GetFreeTimeDialog from './GetFreeTimeDialog.vue'
import { NGradientText } from 'naive-ui'
import { useI18n } from 'vue-i18n'
import { useCloudComputersStore } from '@/store/Modules/gpu/cloud-computers'
const cloudComputersStore = useCloudComputersStore()
const { t } = useI18n()
const router = useRouter()
const route = useRoute()

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
cloudComputersStore.getGpuTypeH()

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
            window.$message?.error('请检查您的填写')
            resolve(false)
          }
        })
      })

      if (rs) {
        window.$message?.success('提交成功')
        currentFreeTime.value = 24
      } else {
        return false
      }
    },
  })
}

const updateH = (val: number) => {
  console.log('选择了距离：', val)
  cloudComputersStore.getGpuTypeH()
}
// 去详情页
const toDetail = (item: any) => {
  router.push({
    name: 'CloudComputersList',
    query: {
      type: item.type,
      longitude: cloudComputersStore.longitude,
      latitude: cloudComputersStore.latitude,
      distance: cloudComputersStore.distance,
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
