<template>
  <div class="my-6">
    <h5 class="leading-[22px] text-[14px]">
      {{ $t('shareGpu.nftDescription') }} <br />
      {{ $t('shareGpu.competitionDescription') }}
    </h5>
    <div class="my-5 font-bold">
      <h2 class="my-1 text-[18px]">
        {{ $t('shareGpu.myTotalNodes') }}
        <span class="text-primary-500">1</span>
      </h2>
      <h2 class="my-1 text-[18px]">
        {{ $t('shareGpu.pledgedNodes') }}

        <span class="text-primary-500">0</span>
      </h2>
    </div>
    <div class="my-3 flex flex-wrap gap-3">
      <n-button class="rounded-lg min-h-[42px] text-[16px] text-black" color="#D7EDEB">
        {{ $t('shareGpu.buyNode') }}
      </n-button>
      <n-button class="rounded-lg min-h-[42px] text-162px] text-black" color="#D7EDEB">
        {{ $t('shareGpu.learnNode') }}
      </n-button>
      <n-button class="rounded-lg min-h-[42px] text-162px] text-black" color="#D7EDEB">
        {{ $t('shareGpu.transfer') }}
      </n-button>
    </div>

    <!-- img -->
    <div class="rounded-[50px] bg-[#D7DADD] p-[25px]">
      <img class="max-w-[100%] max-h-[100%]" src="@/assets/img/nft.png" alt="" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
</script>

<style lang="scss" scoped></style>
