<template>
  <div class="px-[16px]">
    <!-- 导入钱包 -->
    <h1 class="text-black dark:text-white text-[24px] font-bold mb-2">{{ $t('remote.controlRemoteDevice') }}</h1>
    <div class="w-full">
      <n-form ref="formRef" :model="model" :rules="rules" label-placement="top">
        <n-grid :cols="24">
          <n-form-item-gi :span="24" :label="$t('remote.partnerDeviceId')" path="id">
            <n-auto-complete
              v-model:value="model.id"
              :options="app.Inputoptions"
              blur-after-select
              :placeholder="$t('remote.enterDeviceId')"
              :get-show="getShow"
              style="border-radius: 8px"
              class="min-h-[44px] rounded-lg !text-[#737373] dark:text-white/80"
              :input-props="{ inputmode: 'numeric', pattern: '[0-9]*' }"
              @select="handleIdSelect"
              clearable
              :render-option="renderOption"
            />
          </n-form-item-gi>

          <n-form-item-gi :span="24" :label="$t('remote.partnerDeviceCode')" path="password">
            <n-input
              class="min-h-[44px] rounded-lg text-[#737373] dark:text-white/80"
              v-model:value="model.password"
              :placeholder="$t('remote.partnerDeviceCodePlaceholder')"
            />
          </n-form-item-gi>

          <n-form-item-gi :span="24">
            <div class="flex flex-col gap-4 w-full">
              <n-button
                class="w-full rounded-lg min-h-[48px]"
                type="primary"
                round
                @click="handleValidateButtonClick"
                :loading="isSubmitting"
              >
                <span class="text-lg"> {{ $t('remote.Connect') }} </span>
              </n-button>
            </div>
          </n-form-item-gi>
        </n-grid>
      </n-form>
    </div>

    <div class="sm:mt-[42px] md:mt-[100px] text-center flex flex-col gap-3">
      <h1 class="text-[#615F63] dark:text-white/70 text-[21.6px]">{{ $t('remote.community') }}</h1>
      <div class="flex items-center w-full justify-center gap-3">
        <n-button
          @click="handleSocialIconClick(item)"
          circle
          color="#C0E9D0"
          size="large"
          v-for="(item, index) in socialIcons"
          :key="index"
        >
          <template #icon>
            <Icon :icon="item.icon" class="text-[#719981] dark:text-[#21593d]" />
          </template>
        </n-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import type { FormInst, FormRules } from 'naive-ui'
import { NButton, NGradientText, NTag } from 'naive-ui'
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import { appStore } from '@/store/Modules/app'
import { useI18n } from 'vue-i18n'
import { useRemoteStream } from '@/hooks/remote/useRemoteStream'
import LinkDialog from './modules/linkDialog.vue'
const { t, locale } = useI18n()
const { connectToRemoteDevice } = useRemoteStream()
import { objectToBase64 } from '@/utils/common/objToBase64'
import { useBuyNftStore } from '@/store/Modules/nftPiniaStore/index'
import type { SelectOption } from 'naive-ui'
import type { VNodeChild } from 'vue'

const nftStore = useBuyNftStore()
const app = appStore()
const router = useRouter()
const formRef = ref<FormInst | null>(null)
const isSubmitting = ref(false)
// 是否显示showPanel
const showPanel = ref(true)
const getShow = () => showPanel.value
// 表单数据模型
const model = reactive({
  id: '', // 设备ID
  password: '', // 密码
})

// 校验规则（精简单行写法）
const rules: FormRules = {
  id: [{ required: true, message: t('remote.deviceIdRequired'), trigger: ['blur', 'input'] }],
  password: [{ required: true, message: t('remote.passwordRequired'), trigger: ['blur', 'input'] }],
}

// 联系方式图标
const socialIcons = computed(() => {
  if (locale.value === 'zh') {
    return [
      {
        icon: 'mdi:qqchat',
        color: 'blue-500',
        hoverColor: 'blue-600',
        url: '1049988281',
        v: 'QQ',
      },
      {
        icon: 'mdi:youtube',
        color: 'red-600',
        hoverColor: 'red-700',
        url: 'https://youtube.com/@deeplinkglobal',
        v: 'Youtube',
      },

      {
        icon: 'mdi:telegram',
        color: 'blue-500',
        hoverColor: 'blue-600',
        url: 'https://t.me/deeplinkglobal', // 可跳转指定频道：例如 https://t.me/telegram
        v: 'Telegram',
      },
      {
        icon: 'mdi:discord',
        color: 'indigo-500',
        hoverColor: 'indigo-600',
        url: 'https://discord.com/invite/hCSAF3QC8U',
        v: 'Discord',
      },

      {
        icon: 'mdi:twitter',
        color: 'black',
        hoverColor: 'gray-700',
        url: 'https://twitter.com/DeepLinkGlobal',
        v: 'Twitter',
      },
    ]
  } else {
    return [
      {
        icon: 'mdi:youtube',
        color: 'red-600',
        hoverColor: 'red-700',
        url: 'https://youtube.com/@deeplinkglobal',
        v: 'Youtube',
      },

      {
        icon: 'mdi:telegram',
        color: 'blue-500',
        hoverColor: 'blue-600',
        url: 'https://t.me/deeplinkglobal', // 可跳转指定频道：例如 https://t.me/telegram
        v: 'Telegram',
      },
      {
        icon: 'mdi:discord',
        color: 'indigo-500',
        hoverColor: 'indigo-600',
        url: 'https://discord.com/invite/hCSAF3QC8U',
        v: 'Discord',
      },

      {
        icon: 'mdi:twitter',
        color: 'black',
        hoverColor: 'gray-700',
        url: 'https://twitter.com/DeepLinkGlobal',
        v: 'Twitter',
      },
    ]
  }
})
const handleIdSelect = (value: string) => {
  const selected = app.Inputoptions.find((item) => item.value === value)
  if (selected) {
    model.password = selected.password // ✅ 自动填充密码
  }
}

// 自定义下拉项渲染：保留默认高亮 node，再追加图标等
const renderOption = ({
  node,
  option,
}: {
  node: VNodeChild
  option: SelectOption & { icon?: string; password?: string }
}) => {
  const onDelete = (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    // 如果删除的是当前输入框显示的值，直接清空（或恢复到你想要的 prev 文本）
    if (model.id === option.value) {
      model.id = ''
      model.password = ''
    }

    // 直接更新 options，不再关/开面板
    app.Inputoptions = app.Inputoptions.filter((i: any) => i.value !== option.value)
  }

  return h('div', { class: 'w-full flex items-center justify-between gap-2 pr-1' }, [
    h('div', { class: 'flex-1 truncate' }, [node]),
    h(Icon, {
      icon: 'mingcute:close-circle-line',
      class: 'text-primary text-[20px] cursor-pointer',
      onMousedown: (e: MouseEvent) => e.preventDefault(),
      onClick: onDelete,
    }),
  ])
}

// 表单提交
const handleValidateButtonClick = async (e: MouseEvent) => {
  e.preventDefault()
  isSubmitting.value = true

  try {
    await formRef.value?.validate()
    // 先获取nft
    await nftStore.getMyNftListH()
    // connectToRemoteDevice({ id: model.id, password: model.password })
    console.log(nftStore.hasNft, 'nftStore.hasNftnftStore.hasNftnftStore.hasNftnftStore.hasNftnftStore.hasNft')

    connectToRemoteDevice({
      id: model.id,
      password: objectToBase64({
        password: model.password,
        nft_enabled: nftStore.hasNft,
      }),
    })

    const existsIndex = app.Inputoptions.findIndex((item) => item.value === model.id)
    if (existsIndex !== -1) {
      app.Inputoptions.splice(existsIndex, 1) // 去重
    }

    app.Inputoptions.unshift({
      label: model.id,
      value: model.id,
      password: model.password, // ✅ 一并保存
    })

    if (app.Inputoptions.length > 6) {
      app.Inputoptions.pop() // 最多保留 6 条
    }
  } catch (errors) {
    window.$message?.error(t('app.formInvalid'))
  } finally {
    isSubmitting.value = false
  }
}

// 外联跳转
const handleSocialIconClick = (item: any) => {
  const d = window.$dialog?.info({
    title: () => {
      return h(
        NGradientText,
        {
          size: 24,
          type: 'success',
          class: 'font-bold',
        },
        { default: () => item.v }
      )
    },
    content: () => h(LinkDialog, { item }),
    class: 'rounded-2xl dark:bg-[#1a1a1a] dark:text-white',
    negativeButtonProps: { color: '#3CD8A6', size: 'medium' },
    positiveButtonProps: { color: '#03C188', size: 'medium' },

    showIcon: false,
    onPositiveClick: async () => {
      if (d) {
        console.log(888)
      }
    },
  })
}
</script>

<style lang="scss" scoped>
:deep(.n-input__input-el) {
  height: 100% !important;
}
</style>
