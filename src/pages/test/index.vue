<template>
  <div>test</div>
  <button @click="appStore().changeTheme">点击我切换主题(明亮切换)</button>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import appStore from '@/store/Modules/app/app'
</script>

<style lang="scss" scoped></style>
