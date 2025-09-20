<script setup lang="ts">
import { h } from 'vue'
import MyCard from './modules/MyCard.vue'
import BuyDbc from './modules/dialogs/BuyDbc.vue'
import { NGradientText } from 'naive-ui'
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()
</script>

<template>
  <div class="px-[16px] w-full">
    <MyCard />
  </div>
</template>

<style lang="scss" scoped></style>
