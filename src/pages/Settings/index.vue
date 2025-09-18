<script setup lang="ts">
import { ref, watch } from 'vue'
import { NCard, NSwitch } from 'naive-ui'
import LanguageSwitcher from '@/components/common/LanguageSwitcher.vue'
import ThemeSwitcher from '@/components/common/ThemeSwitcher.vue'
import { LANG_MAP } from '@/constant/APP'
import { appStore } from '@/store/Modules/app/index'
import { useAppVersion } from '@/hooks/common/useAppVersion'
import { useStreamConfig } from '@/hooks/setting/useStreamConfig'
import { useI18n } from 'vue-i18n'

const app = appStore()
const { t } = useI18n()
const { version } = useAppVersion(t)
// 切换模式
const toggleMode = (val: boolean) => {
  console.log('切换模式:', val)
  app.mode = val
}
// ✅ 切换方法（模拟业务逻辑）
const toggleDisableMouse = (val: boolean) => {
  console.log('当使用虚拟摇杆时禁用鼠标:', val)
  app.disableMouseWhenJoystick = val
}

const toggleAutoVirtualJoystick = (val: boolean) => {
  console.log('使用自动的虚拟摇杆:', val)
  app.useAutoVirtualJoystick = val
}

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
  <div class="px-4 pb-6 w-full mx-auto">
    <div class="space-y-5">
      <!-- ✅ 切换模式 -->
      <!-- <n-card content-class="!px-3" class="rounded-xl bg-surface dark:bg-surface-dark">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <Icon icon="mdi:medal-outline" class="text-[20px] text-primary-600" />
            {{ $t('setting.title') }} ({{ app.mode ? $t('setting.point') : $t('setting.token') }})
          </div>
          <n-switch
            :rail-style="
              ({ checked }) => ({
                backgroundColor: checked ? '#03C188' : '#dcdcdc',
              })
            "
            v-model:value="app.mode"
            @update:value="toggleMode"
          />
        </div>
      </n-card> -->
      <!-- 主题设置 -->
      <n-card content-class="!px-3" class="rounded-xl bg-surface dark:bg-surface-dark">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <Icon icon="mdi:theme-light-dark" class="text-[20px] text-primary-600" />
            <span class="font-medium text-[15px] text-black dark:text-white">{{ $t('setting.darkMode') }}</span>
          </div>
          <ThemeSwitcher />
        </div>
      </n-card>

      <!-- 语言设置 -->
      <n-card content-class="!px-3" class="rounded-xl bg-surface dark:bg-surface-dark">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <Icon icon="mdi:translate" class="text-[20px] text-primary-600" />
            <span class="font-medium text-[15px] text-black dark:text-white">
              {{ LANG_MAP[app.lang]?.label }}
            </span>
          </div>
          <LanguageSwitcher />
        </div>
      </n-card>

      <!-- ✅ 禁用鼠标操作（虚拟摇杆） -->
      <n-card content-class="!px-3" class="rounded-xl bg-surface dark:bg-surface-dark">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <Icon icon="mdi:mouse-off" class="text-[20px] text-primary-600" />
            <n-tooltip trigger="hover">
              <template #trigger>
                <span class="font-medium text-[15px] text-black dark:text-white"> {{ $t('setting.disableMouse') }} </span>
              </template>
              {{ $t('setting.disableMouseTip') }}
            </n-tooltip>
          </div>
          <n-switch
            :rail-style="
              ({ checked }) => ({
                backgroundColor: checked ? '#03C188' : '#dcdcdc',
              })
            "
            v-model:value="app.disableMouseWhenJoystick"
            @update:value="toggleDisableMouse"
          />
        </div>
      </n-card>

      <!-- ✅ 自动启用虚拟摇杆 -->
      <n-card content-class="!px-3" class="rounded-xl bg-surface dark:bg-surface-dark">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <Icon icon="mdi:gamepad-variant" class="text-[20px] text-primary-600" />
            <n-tooltip trigger="hover">
              <template #trigger>
                <span class="font-medium text-[15px] text-black dark:text-white"> {{ $t('setting.autoJoystick') }} </span>
              </template>
              {{ $t('setting.autoJoystickTip') }}
            </n-tooltip>
          </div>
          <n-switch
            :rail-style="
              ({ checked }) => ({
                backgroundColor: checked ? '#03C188' : '#dcdcdc',
              })
            "
            v-model:value="app.useAutoVirtualJoystick"
            @update:value="toggleAutoVirtualJoystick"
          />
        </div>
      </n-card>

      <!-- 应用版本号显示 -->
      <n-card content-class="!px-3" class="rounded-xl bg-surface dark:bg-surface-dark">
        <div class="flex items-center justify-between flex-wrap gap-2">
          <div class="flex items-center gap-2">
            <Icon icon="mdi:information-outline" class="text-[20px] text-primary-600" />
            <span class="font-medium text-[15px] text-black dark:text-white">{{ $t('setting.currentVersion') }}</span>
          </div>
          <span class="text-[13px] text-gray-500 dark:text-gray-400 font-mono">
            {{ version }}
          </span>
        </div>
      </n-card>
    </div>
  </div>
</template>
