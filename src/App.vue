<template>
  <RouterView />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { toggleTheme } from '@/hooks/useToggleTheme'
toggleTheme()
</script>

<style lang="scss" scoped></style>
