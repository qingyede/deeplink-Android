<template>
  <div class="flex flex-col gap-5 items-center justify-center">
    <img v-if="props.item?.img" class="w-full h-[300px] object-fill" :src="props.item?.img" alt="" />

    <h1 class="text-center text-lg md:text-xl font-semibold text-gray-800 dark:text-white">
      Join us on
      <span
        @click="copyH(props.item?.url)"
        class="text-primary-600 dark:text-primary-400 underline hover:text-primary-800 dark:hover:text-primary-300 transition-colors duration-300 text-sm md:text-[15px] cursor-pointer"
      >
        {{ props.item?.url }}
      </span>
    </h1>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useClipboard } from '@vueuse/core'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const { copy } = useClipboard()
const props = defineProps(['item'])
// 点击复制
const copyH = (url) => {
  console.log(url)
  copy(url)

  window.$message?.success(t('app.copySuccess'))
}
</script>

<style lang="scss" scoped></style>
