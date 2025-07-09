<template>
  <div class="my-6">
    <h5 class="leading-[22px] text-[14px]">
      {{ $t('shareGpu.shareToEarn') }}<br />
      {{ $t('shareGpu.earnWithoutRenting') }}.<br />
      {{ $t('shareGpu.hardwareRequirement') }}<br />
      {{ $t('shareGpu.rewardExample') }}<br />
      {{ $t('shareGpu.rentBonus') }}<br />
      {{ $t('shareGpu.rentalHoursNote') }}<br />
      {{ $t('shareGpu.electricityCost') }}
    </h5>

    <div class="my-3 flex flex-wrap gap-3">
      <n-button
        class="rounded-lg min-h-[42px] text-[16px] text-black"
        color="#D7EDEB"
        v-for="(item, index) in btnData"
        :key="index"
        @click="item.h"
      >
        {{ $t(item.t) }}
      </n-button>
    </div>

    <h5 class="leading-[20px] text-[14px]">
      {{ $t('shareGpu.infoSectionTitle') }}
      <span class="text-primary-500">254</span>
    </h5>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import UploadMyInfo from './modules/uploadMyInfo.vue'
import RuleDialog from './modules/ruleDialog.vue'
import { NGradientText } from 'naive-ui'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

// 按钮数据
const btnData = ref([
  {
    t: 'shareGpu.upload_my_info',
    h: () => {
      const formRef: any = ref(null)
      const d = window.$dialog?.info({
        title: () => {
          return h(
            NGradientText,
            {
              size: 24,
              type: 'success',
              class: 'font-bold',
            },
            { default: () => t('shareGpu.my_information') }
          )
        },
        content: () => h(UploadMyInfo, { ref: formRef }),
        class: 'rounded-2xl dark:bg-[#1a1a1a] dark:text-white',
        showIcon: false,
        positiveText: '确定',
        negativeText: '取消',
        negativeButtonProps: { color: '#3CD8A6', size: 'medium' },
        positiveButtonProps: { color: '#03C188', size: 'medium' },
        onPositiveClick: async () => {
          console.log(formRef.value)
          const rs = await new Promise(async (resolve, reject) => {
            formRef.value?.formRef?.validate(async (errors) => {
              if (!errors) {
                resolve(true)
              } else {
                window.$message?.error('请检查您的输入')
                resolve(false)
              }
            })
          })
          if (rs) {
            if (d) {
              d.loading = true
              d.positiveText = 'loading...'
              // 模拟异步
              await new Promise((resolve, reject) => {
                setTimeout(() => {
                  d.loading = false
                  d.positiveText = '确定'
                  window.$message?.success('上传成功')
                  resolve(true)
                }, 2000)
              })
            }
          } else {
            return false
          }
        },
      })
    },
  },
  {
    t: 'shareGpu.rule',
    h: () => {
      const formRef: any = ref(null)
      const d = window.$dialog?.info({
        title: () => {
          return h(
            NGradientText,
            {
              size: 24,
              type: 'success',
              class: 'font-bold',
            },
            { default: () => t('shareGpu.rental_rules') }
          )
        },
        content: () => h(RuleDialog, { ref: formRef }),
        class: 'rounded-2xl dark:bg-[#1a1a1a] dark:text-white',
        showIcon: false,

        negativeButtonProps: { color: '#3CD8A6' },
        positiveButtonProps: { color: '#03C188' },
        onPositiveClick: async () => {
          console.log(formRef.value)
          const rs = await new Promise(async (resolve, reject) => {
            formRef.value?.formRef?.validate(async (errors) => {
              if (!errors) {
                resolve(true)
              } else {
                window.$message?.error('请检查您的输入')
                resolve(false)
              }
            })
          })
          if (rs) {
            if (d) {
              d.loading = true
              d.positiveText = 'loading...'
              // 模拟异步
              await new Promise((resolve, reject) => {
                setTimeout(() => {
                  d.loading = false
                  d.positiveText = '确定'
                  window.$message?.success('上传成功')
                  resolve(true)
                }, 2000)
              })
            }
          } else {
            return false
          }
        },
      })
    },
  },
  {
    t: 'shareGpu.refreshList',
    h: () => {
      window.$message?.info(t('shareGpu.machine_list_refresh'))
    },
  },
])
</script>

<style lang="scss" scoped></style>
