<template>
  <Icon v-if="!local" :icon="name" :style="iconStyle" />
  <svg v-else :style="iconStyle">
    <use :href="`#icon-${name}`" :fill="c" :style="iconStyle"></use>
  </svg>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { Icon } from '@iconify/vue';

defineOptions({
  name: 'MyIcon',
});

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    default: 'inherit',
  },
  c: {
    type: String,
    default: 'inherit',
  },
  w: {
    type: String,
    default: '100%',
  },
  h: {
    type: String,
    default: '100%',
  },
  local: {
    type: Boolean,
    default: false,
  },
});

const iconStyle = computed(() => ({
  width: props.w,
  height: props.h,
  fontSize: props.size,
  color: props.c,
}));
</script>
