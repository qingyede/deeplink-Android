<template>
  <div class="my-6">
    <h5 class="leading-[22px] text-[14px]">
      {{ $t('shareGpu.earn_rental_income') }} <br />
      {{ $t('shareGpu.requirements') }}<br />
      {{ $t('shareGpu.sharing_method') }} <br />{{ $t('shareGpu.example') }}
    </h5>

    <div class="my-3 flex flex-wrap gap-3">
      <n-button @click="featH" class="rounded-lg min-h-[42px] text-[16px] text-black" color="#D7EDEB">
        {{ $t('shareGpu.upload_info') }}
      </n-button>
    </div>

    <h5 class="leading-[20px] text-[14px] text-error-500">
      {{ $t('shareGpu.feature_development') }}
    </h5>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const featH = () => {
  window.$message?.error('This feature is under development, stay tuned!')
}
</script>

<style lang="scss" scoped></style>
