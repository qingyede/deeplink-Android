// import { useClipboard } from '@vueuse/core'
// import { ref } from 'vue'
// export default function useCopyPlus() {
//   const source = ref('Hello')
//   const { text, copy, copied, isSupported } = useClipboard({ source })
//   const copyHandler = async (msg1, msg2) => {
//     if (isSupported.value) {
//       // 浏览器支持复制
//       await copy(source.value)
//       if (copied.value) {
//         // 复制成功
//         ElMessage({
//           type: 'success',
//           message: msg1
//         })
//       } else {
//         // 复制失败
//         ElMessage({
//           type: 'error',
//           message: msg2
//         })
//       }
//     } else {
//       // 浏览器不支持复制
//       ElMessage({
//         message: '对不起，您的设备不支持复制.',
//         type: 'warning'
//       })
//     }
//   }
//   return {
//     copyHandler,
//     source,
//     text,
//     copied
//   }
// }
