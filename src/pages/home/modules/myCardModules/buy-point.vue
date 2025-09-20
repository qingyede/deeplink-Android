<template>
  <div class="space-y-4 xl:min-w-[700px]">
    <!-- 警告 -->
    <div class="text-[13px] md:text-[15px] text-warning-light dark:text-warning-dark">
      {{ $t('p.home.withPoints') }}
    </div>

    <!-- 骨架屏 -->
    <div v-if="loading" class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
      <div v-for="i in bugData.length" :key="i" class="flex flex-col gap-1 items-center justify-center">
        <n-skeleton circle height="50px" />
        <n-skeleton style="width: 96px; height: 27px; border-radius: 12px" />
      </div>
    </div>

    <!-- 原内容 -->
    <div v-else class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-4 md:gap-y-8">
      <div v-for="(item, index) in bugData" :key="index" class="flex flex-col items-center justify-center">
        <h1 class="font-bold text-[17px] md:text-xl">{{ item.number }}</h1>

        <img v-if="index === 0" class="w-[42px] h-[30px] md:h-[36px] object-fill" :src="item.img" alt="" />
        <img v-else class="w-[70px] h-[30px] md:w-[90px] md:h-[36px] object-fill" :src="item.img" alt="" />

        <h3 class="text-sm my-1">{{ item.text }}</h3>

        <n-button @click="onOpen(item)" class="rounded-xl px-2 md:px-3 !py-0 !h-[27px] text-sm md:text-base" type="primary">
          {{ $t('p.home.buyNow') }}
        </n-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { appStore } from '@/store/Modules/app'
import { useImage } from '@vueuse/core'
import { withMinDelay } from '@/utils/common/withMinDelay'
import point0 from '@/assets/img/point0.png'
import point1 from '@/assets/img/point1.png'
import point2 from '@/assets/img/point2.png'
import point3 from '@/assets/img/point3.png'
import point4 from '@/assets/img/point4.png'
import point5 from '@/assets/img/point5.png'
import point6 from '@/assets/img/point6.png'
import point7 from '@/assets/img/point7.png'
import { getPointBuyLink } from '@/api/buyNft/index'
import { loginStore } from '@/store/Modules/login/login'

const app = appStore()
const login = loginStore()
const loading = ref(true)

// 卡片数据（7 个）

const bugData = ref([
  {
    number: '$5',
    text: '5000 points',
    value: 5000,
    img: point0,
    product_id: 'prod_4MBe51eU6cvLcuzGHFjLZE',
  },
  {
    number: '$10',
    text: '10000 points',
    value: 10000,
    img: point1,
    product_id: 'prod_7D75iFxkbDWUhuCaSegMrP',
  },
  {
    number: '$15',
    text: '15000 points',
    value: 15000,
    img: point2,
    product_id: 'prod_4cHi1F6MB9HkHNByOp8PyX',
  },
  {
    number: '$20',
    text: '20000 points',
    value: 20000,
    img: point3,
    product_id: 'prod_2Qm2ApNRCwbpVWI0FIEbBl',
  },
  {
    number: '$25',
    text: '25000 points',
    value: 25000,
    img: point4,
    product_id: 'prod_6HoR1gM7mP5oDNVPr4aGLX',
  },
  {
    number: '$30',
    text: '30000 points',
    value: 30000,
    img: point5,
    product_id: 'prod_1ivlJfN9KxYeBcEhleawRY',
  },
  {
    number: '$35',
    text: '35000 points',
    value: 35000,
    img: point6,
    product_id: 'prod_6neOEK2SaWGzP0JQvgPNf4',
  },
  {
    number: '$40',
    text: '40000 points',
    value: 40000,
    img: point7,
    product_id: 'prod_gWRqmD96hKzs41x75sAsE',
  },
])

// 所有图片加载完成后关闭骨架屏（最小 1 秒）
onMounted(async () => {
  await withMinDelay(async () => {
    const promises = bugData.value.map((item) => {
      const { isLoading } = useImage({ src: item.img })
      return new Promise((resolve) => {
        const stop = watch(isLoading, (val) => {
          if (!val) {
            stop()
            resolve(true)
          }
        })
      })
    })
    await Promise.all(promises)
  }, 800)

  loading.value = false
})

// 外链跳转
const onOpen = async (item) => {
  console.log(item)
  // 获取跳转链接
  const { data: res } = await getPointBuyLink({
    id: login.walletId,
    product_id: item.product_id,
  })
  if (res.success) {
    window.open(res.data, '_blank', 'noopener,noreferrer')
  } else {
    window.$message?.error(res.msg)
  }
}
</script>

<style lang="scss" scoped></style>
