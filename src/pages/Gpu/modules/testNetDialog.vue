<template>
  <div class="relative flex flex-col items-center justify-center min-h-[150px]">
    <!-- 火焰动画 -->
    <div v-if="loading" class="fire mt-7">
      <div class="fire-left">
        <div class="main-fire"></div>
        <div class="particle-fire"></div>
      </div>
      <div class="fire-center">
        <div class="main-fire"></div>
        <div class="particle-fire"></div>
      </div>
      <div class="fire-right">
        <div class="main-fire"></div>
        <div class="particle-fire"></div>
      </div>
      <div class="fire-bottom">
        <div class="main-fire"></div>
      </div>
    </div>

    <!-- 测试结果 -->
    <div v-else class="mt-4 text-green-400 text-lg">{{ $t('gpu.networkLatency') }}：{{ latency }} ms</div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useTimeoutFn } from '@vueuse/core'

const latency = ref<number | null>(null)
const loading = ref(true)

onMounted(async () => {
  const start = performance.now()
  try {
    await new Promise((resolve) => setTimeout(resolve, 3000))
  } catch (e) {
    // 可处理网络错误
  } finally {
    const end = performance.now()
    latency.value = Math.round(end - start)

    // 为了让火焰转一会
    useTimeoutFn(() => {
      loading.value = false
    }, 1000) // fire 至少展示 1 秒
  }
})
</script>

<style lang="scss" scoped>
$fire-size: 88px;

@keyframes scaleUpDown {
  0%,
  100% {
    transform: scaleY(1) scaleX(1);
  }

  50%,
  90% {
    transform: scaleY(1.1);
  }

  75% {
    transform: scaleY(0.95);
  }

  80% {
    transform: scaleX(0.95);
  }
}

@keyframes shake {
  0%,
  100% {
    transform: skewX(0) scale(1);
  }

  50% {
    transform: skewX(5deg) scale(0.9);
  }
}

@keyframes particleUp {
  0% {
    opacity: 0;
  }

  20% {
    opacity: 1;
  }

  80% {
    opacity: 1;
  }

  100% {
    opacity: 0;
    top: -100%;
    transform: scale(0.5);
  }
}

@keyframes glow {
  0%,
  100% {
    background-color: #3cff1e;
  }

  50% {
    background-color: #3cff1e;
  }
}

.fire {
  position: absolute;
  top: calc(50% - #{$fire-size} / 2);
  left: calc(50% - #{$fire-size} / 2);
  width: $fire-size;
  height: $fire-size;
  background-color: transparent;
  margin-left: auto;
  margin-right: auto;
}

.fire-center {
  position: absolute;
  height: 100%;
  width: 100%;
  animation: scaleUpDown 3s ease-out infinite both;
}

.fire-center .main-fire {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(farthest-corner at calc(#{$fire-size} * 0.2) 0, #3cff1e 0%, #3cff1e 95%);
  transform: scaleX(0.8) rotate(45deg);
  border-radius: 0 40% 60% 40%;
  filter: drop-shadow(0 0 10px #3cff1e);
}

.fire-center .particle-fire {
  position: absolute;
  top: 60%;
  left: 45%;
  width: calc(#{$fire-size} * 0.2);
  height: calc(#{$fire-size} * 0.2);
  background-color: #3cff1e;
  border-radius: 50%;
  filter: drop-shadow(0 0 10px #d43322);
  animation: particleUp 2s ease-out infinite both;
}

.fire-right {
  position: absolute;
  height: 100%;
  width: 100%;
  animation: shake 2s ease-out infinite both;
}

.fire-right .main-fire {
  position: absolute;
  top: 15%;
  right: -25%;
  width: 80%;
  height: 80%;
  background-color: #3cff1e;
  transform: scaleX(0.8) rotate(45deg);
  border-radius: 0 40% 60% 40%;
  filter: drop-shadow(0 0 10px #3cff1e);
}

.fire-right .particle-fire {
  position: absolute;
  top: 45%;
  left: 50%;
  width: calc(#{$fire-size} * 0.3);
  height: calc(#{$fire-size} * 0.3);
  background-color: #3cff1e;
  transform: scaleX(0.8) rotate(45deg);
  border-radius: 50%;
  filter: drop-shadow(0 0 10px #3cff1e);
  animation: particleUp 2s ease-out infinite both;
}

.fire-left {
  position: absolute;
  height: 100%;
  width: 100%;
  animation: shake 3s ease-out infinite both;
}

.fire-left .main-fire {
  position: absolute;
  top: 15%;
  left: -20%;
  width: 80%;
  height: 80%;
  background-color: #3cff1e;
  transform: scaleX(0.8) rotate(45deg);
  border-radius: 0 40% 60% 40%;
  filter: drop-shadow(0 0 10px #3cff1e);
}

.fire-left .particle-fire {
  position: absolute;
  top: 10%;
  left: 20%;
  width: calc(#{$fire-size} * 0.15);
  height: calc(#{$fire-size} * 0.15);
  background-color: #3cff1e;
  border-radius: 50%;
  filter: drop-shadow(0 0 10px #d43322);
  animation: particleUp 3s ease-out infinite both;
}

.fire-bottom .main-fire {
  position: absolute;
  top: 30%;
  left: 20%;
  width: 75%;
  height: 75%;
  background-color: #3cff1e;
  transform: scaleX(0.8) rotate(45deg);
  border-radius: 0 40% 100% 40%;
  filter: blur(10px);
  animation: glow 2s ease-out infinite both;
}
</style>
