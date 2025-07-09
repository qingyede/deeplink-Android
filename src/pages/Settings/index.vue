<script setup lang="ts">
import { ref, watch } from 'vue'
import { NCard, NSwitch } from 'naive-ui'
import LanguageSwitcher from '@/components/common/LanguageSwitcher.vue'
import ThemeSwitcher from '@/components/common/ThemeSwitcher.vue'
import { LANG_MAP } from '@/constant/APP'
import { appStore } from '@/store/Modules/app/index'
import { useAppVersion } from '@/hooks/common/useAppVersion'

const { version } = useAppVersion()

const app = appStore()

// ✅ 切换方法（模拟业务逻辑）
const toggleDisableMouse = (val: boolean) => {
  console.log('当使用虚拟摇杆时禁用鼠标:', val)
  app.disableMouseWhenJoystick = val
}

const toggleAutoVirtualJoystick = (val: boolean) => {
  console.log('使用自动的虚拟摇杆:', val)
  app.useAutoVirtualJoystick = val
}

import { useStreamConfig } from '@/hooks/setting/useStreamConfig'

const { sendStreamConfig } = useStreamConfig()

// ✅ 联调逻辑：每次变动都推给 native
const sendCurrentConfig = () => {
  sendStreamConfig({
    noMouseWithVKeys: app.disableMouseWhenJoystick ? 1 : 0,
    useAutoVKeys: app.useAutoVirtualJoystick ? 1 : 0,
  })
}

watch(() => app.disableMouseWhenJoystick, sendCurrentConfig)
watch(() => app.useAutoVirtualJoystick, sendCurrentConfig)

// ✅ 页面初始化也可发送一次（可选）
sendCurrentConfig()
</script>

<template>
  <div class="px-4 pb-6 w-full max-w-screen-md mx-auto">
    <div class="space-y-5">
      <!-- 主题设置 -->
      <n-card
        class="rounded-xl border border-[#e7e8ea] dark:border-[#3c3d3f] dark:bg-[#1e1e1e] transition-colors duration-300"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <Icon icon="mdi:theme-light-dark" class="text-[20px] text-primary-600" />
            <span class="font-medium text-base text-black dark:text-white">暗色模式</span>
          </div>
          <ThemeSwitcher />
        </div>
      </n-card>

      <!-- 语言设置 -->
      <n-card
        class="rounded-xl border border-[#e7e8ea] dark:border-[#3c3d3f] dark:bg-[#1e1e1e] transition-colors duration-300"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <Icon icon="mdi:translate" class="text-[20px] text-primary-600" />
            <span class="font-medium text-base text-black dark:text-white">
              {{ LANG_MAP[app.lang]?.label }}
            </span>
          </div>
          <LanguageSwitcher />
        </div>
      </n-card>

      <!-- ✅ 新增：当使用虚拟摇杆时禁用鼠标 -->
      <n-card
        class="rounded-xl border border-[#e7e8ea] dark:border-[#3c3d3f] dark:bg-[#1e1e1e] transition-colors duration-300"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <Icon icon="mdi:mouse-off" class="text-[20px] text-primary-600" />
            <span class="font-medium text-base text-black dark:text-white"> 当使用虚拟摇杆时禁用鼠标 </span>
          </div>
          <n-switch v-model:value="app.disableMouseWhenJoystick" @update:value="toggleDisableMouse" />
        </div>
      </n-card>

      <!-- ✅ 新增：使用自动的虚拟摇杆 -->
      <n-card
        class="rounded-xl border border-[#e7e8ea] dark:border-[#3c3d3f] dark:bg-[#1e1e1e] transition-colors duration-300"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <Icon icon="mdi:gamepad-variant" class="text-[20px] text-primary-600" />
            <span class="font-medium text-base text-black dark:text-white"> 使用自动的虚拟摇杆 </span>
          </div>
          <n-switch v-model:value="app.useAutoVirtualJoystick" @update:value="toggleAutoVirtualJoystick" />
        </div>
      </n-card>

      <!-- 应用版本号显示 -->
      <n-card
        class="rounded-xl border border-[#e7e8ea] dark:border-[#3c3d3f] dark:bg-[#1e1e1e] transition-colors duration-300"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <Icon icon="mdi:information-outline" class="text-[20px] text-primary-600" />
            <span class="font-medium text-base text-black dark:text-white">当前版本</span>
          </div>
          <span class="text-sm text-gray-500 dark:text-gray-400 font-mono">
            {{ version }}
          </span>
        </div>
      </n-card>
    </div>
  </div>
</template>
