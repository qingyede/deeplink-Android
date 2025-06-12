<template>
  <div class="flex items-center gap-12 px-[16px] mt-3 mb-6">
    <Icon v-if="isShow" @click="router.go(-1)" icon="mdi:arrow-left" class="text-[26px]" />
    <img src="@/assets/img/deeplinklogo.png" class="w-[196px] h-[25px] object-cover" alt="" />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// 不显示的路由
const hideRoutes = ['home']
// 根据路由是否显示返回按钮
const isShow = computed(() => {
  if (hideRoutes.includes(route.name as string)) {
    return false
  } else {
    return true
  }
})
</script>

<style lang="scss" scoped></style>
