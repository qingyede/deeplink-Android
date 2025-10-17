<template>
  <div
    class="flex flex-col gap-5 w-full rounded-lg text-white px-[17px] py-[27px] relative"
    style="background: linear-gradient(to right, #017543 0%, #017543 26%, #03ff91 100%)"
  >
    <div class="flex gap-6 items-start flex-wrap gap-y-2 text-white">
      <!-- 左侧余额显示区-代币模式 -->
      <div v-if="!app.mode" class="flex flex-wrap items-start gap-x-2 text-base font-bold tabular-nums">
        <template v-if="showBalance">
          <div class="text-[17.5px] text-base font-bold tabular-nums">
            {{
              price.useLocalizedCurrency(
                convertDbcToUsd(Number(dbcNumber), dbc_price) + convertDlcToUsd(Number(dlcNumber), dlc_price)
              )
            }}
          </div>
        </template>

        <template v-else>
          <span class="text-base font-bold tabular-nums">*********</span>
        </template>

        <!-- 右侧眼睛图标 -->
        <Icon
          :icon="showBalance ? 'mdi:eye' : 'mdi:eye-off'"
          class="cursor-pointer text-[20px] flex-shrink-0"
          @click="toggleBalance"
        />
      </div>

      <!-- 积分模式 -->
      <div v-else class="flex flex-wrap items-start gap-x-2 text-base font-bold tabular-nums">
        <div class="text-[17.5px] text-base font-bold tabular-nums">
          {{ points }}
        </div>

        <span class="text-base font-bold tabular-nums">{{ $t('p.home.points') }}</span>
      </div>
    </div>

    <h1 v-if="!app.mode" class="flex items-center gap-3">
      <span class="text-[12px]">{{ maskAddress(app.address) }} </span>
      <Icon @click="copyH" icon="mdi:content-copy" class="cursor-pointer text-[18px]" />
    </h1>

    <h1 v-else class="flex items-center gap-3">
      <span class="text-[12px]">{{ login.walletAddress }} </span>
      <Icon @click="copyHPoint" icon="mdi:content-copy" class="cursor-pointer text-[16px]" />
    </h1>
    <!-- 代币操作按钮 -->
    <h1 class="flex items-center gap-2 flex-wrap" v-if="!app.mode">
      <n-button
        v-for="(item, index) in cardAction"
        :key="index"
        @click="item.h"
        secondary
        class="text-white text-[12px] md:text-[13px] dark:text-white rounded-lg"
      >
        <template #icon>
          <Icon v-if="item.icon" :icon="item.icon" class="text-[18px]" />
        </template>
        {{ $t(item.t) }}
      </n-button>
    </h1>
    <!-- 积分操作按钮 -->
    <h1 class="flex items-center gap-2 flex-wrap" v-else>
      <n-button
        v-for="(item, index) in PointcardAction"
        :key="index"
        @click="item.h"
        secondary
        class="text-white text-[12px] md:text-[13px] dark:text-white rounded-lg"
      >
        <template #icon>
          <Icon v-if="item.icon" :icon="item.icon" class="text-[18px]" />
        </template>
        {{ $t(item.t) }}
      </n-button>
    </h1>
  </div>
</template>

<script lang="ts" setup>
import { appStore } from '@/store/Modules/app'
import { useMaskAddress } from '@/hooks/common/useMaskAddress'
import { useGetDbcAndDlcNumber } from '@/hooks/wallet/useGetDbcAndDlcNumber'
import { convertDbcToUsd, convertDlcToUsd } from '@/utils/common/transferToUsd'
import { useGetDbcPrice } from '@/hooks/store/useGetDbcPrice'
import { useGetDlcPrice } from '@/hooks/store/useGetDlcPrice'
import { priceStore } from '@/store/Modules/price/index'
import { useI18n } from 'vue-i18n'
import { useWalletToken } from '@/hooks/wallet/useWalletToken'
import { useWalletPoint } from '@/hooks/wallet/useWalletPoint'
import { loginStore } from '@/store/Modules/login/login'
import { useGetUserPoints } from '@/hooks/wallet/useGetUserPoint'

const { points } = useGetUserPoints()
const login = loginStore()
const { t } = useI18n()
const { dbc_price } = useGetDbcPrice()
const { dlc_price } = useGetDlcPrice()
const price = priceStore()
const { dbcNumber, dlcNumber } = useGetDbcAndDlcNumber()
const app = appStore()
const { maskAddress } = useMaskAddress()
const { showBalance, toggleBalance, copyH, cryptoData, cardAction } = useWalletToken()
const { PointcardAction, copyHPoint } = useWalletPoint()
</script>

<style lang="scss" scoped></style>
