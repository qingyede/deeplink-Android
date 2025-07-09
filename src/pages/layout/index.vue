<template>
  <div :style="{ position: 'fixed', top: safeAreaInsetTop, left: 0 }" class="w-full overflow-y-scroll h-full pb-[110px]">
    <!-- 顶部logo -->
    <MyHeader />
    <div class="pb-[80px]">
      <RouterView />
    </div>
    <!-- footer -->
    <MyFooter />
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'Layout',
})
import { useSafeArea } from '@/hooks/common/useSafeArea'
import MyHeader from './layout-header/index.vue'
import MyFooter from './layout-footer/index.vue'
import { appStore } from '@/store/Modules/app/index'
const app = appStore()
const { safeAreaInsetTop } = useSafeArea()
</script>

<style lang="scss" scoped></style>
