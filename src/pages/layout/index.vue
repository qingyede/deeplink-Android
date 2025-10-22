<template>
  <div
    :style="{ position: 'fixed', top: safeAreaInsetTop, left: 0 }"
    class="w-full overflow-y-scroll h-full pb-[110px] bg-background-light text-text-light-primary dark:text-text-dark-primary dark:bg-background-dark min-h-[100vh] transition-colors duration-500"
  >
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
const { safeAreaInsetTop } = useSafeArea()
</script>

<style lang="scss" scoped></style>
