<template>
  <p>
    66666666666666666666
    点击我切换主题点击我切换主题点击我切换主题点击我切换主题点击我切换主题点击我切换主题点击我切换主题点击我切换主题点击我切换主题点击我切换主题点击我切换主题点击我切换主题点击我切换主题点击我切换主题点击我切换主题点击我切换主题点击我切换主题点击我切换主题点击我切换主题点击我切换主题点击我切换主题点击我切换主题点击我切换主题点击我切换主题点击我切换主题点击我切换主题点击我切换主题点击我切换主题点击我切换主题点击我切换主题点击我切换主题点击我切换主题点击我切换主题点击我切换主题点击我切换主题点击我切换主题点击我切换主题点击我切换主题点击我切换主题点击我切换主题点击我切换主题点击我切换主题点击我切换主题点击我切换主题点击我切换主题点击我切换主题点击我切换主题点击我切换主题点击我切换主题点击我切换主题点击我切换主题点击我切换主题点击我切换主题点击我切换主题点击我切换主题x666666666
  </p>
  <div>home{{ login().row }}点击我切换主题(明亮切换)</div>
  <!-- 使用 Material Design Icons 中的 home 图标 -->
  <div class="box">
    <MyIcon name="bxl:dev-to" c="green" isLocal />
    <MyIcon name="vue" c="red" local />
  </div>
  <button @click="appStore().changeTheme">点击我切换主题(明亮切换)</button>
  <div class="theme">
    <p>66666666666</p>
  </div>
  <br />
  <button @click="router.push({ name: 'test' })">push</button>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { Icon } from '@iconify/vue'
import MyIcon from '@/components/common/my_icon/my_icon.vue'
import login from '@/store/Modules/login/login'
import router from '@/router/index'
login().row = '/////////////////'
import appStore from '@/store/Modules/app/app'

import { fetchUserData, signUpCode } from '@/api/test/test'
fetchUserData('6')
// signUpCode({ phone: '19560562334' })
// const { isFetching, data, execute, error } = signUpCode({
//   phone: '19560562334',
// })
// console.log(isFetching, data, execute, error.value)
signUpCode({
  phone: '',
})
</script>

<style lang="scss" scoped>
.box {
  width: 100px;
  height: 100px;
  border: 1px solid blue;
  font-weight: 600;
}
.theme {
  max-width: 500px;
  height: 500px;
  margin-top: 50px;
  @include mobile {
    p {
      background-color: rgb(0, 255, 110) !important;
    }
  }
}
button {
  color: skyblue;
}
</style>
