<template>
  <n-scrollbar style="max-height: 500px">
    <div class="flex flex-col gap-6 text-sm leading-6">
      <p>
        <span class="font-bold text-[14.5px] text-primary-500">{{ $t('shareGpu.rules_title') }}</span>
        {{ $t('shareGpu.rules_rental_bonus') }}
      </p>

      <p>{{ $t('shareGpu.gpu_requirements') }}</p>

      <p>
        {{ $t('shareGpu.staking_requirements') }}
        <span class="font-bold text-[14.5px] text-primary-500">{{ $t('shareGpu.staking_reference_url') }}</span>
      </p>

      <p>
        {{ $t('shareGpu.nft_staking_requirements') }}
        <span class="font-bold text-[14.5px] text-primary-500">{{ $t('shareGpu.nft_purchase_url') }}</span>
      </p>

      <p>
        <span class="font-bold text-[14.5px] text-primary-500">{{ $t('shareGpu.important_reminder') }}</span>
        <span class="text-error-500">{{ $t('shareGpu.pre_rental_warning') }}</span>
      </p>

      <p class="text-error-500">{{ $t('shareGpu.delete_personal_files') }}</p>

      <p class="text-error-500">{{ $t('shareGpu.install_steam') }}</p>

      <p>{{ $t('shareGpu.install_games') }}</p>
    </div>
  </n-scrollbar>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
</script>

<style lang="scss" scoped></style>
