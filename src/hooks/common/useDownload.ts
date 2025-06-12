// export default function useDownload() {
//   // 下载模板事件
//   const downloadFileHooks = (url) => {
//     const a = document.createElement('a')
//     if (import.meta.env.MODE === 'development') {
//       // 测试环境
//       a.href = url
//     } else {
//       // 正式环境
//       a.href = url
//     }

//     a.download = '' // 可选：设置下载文件名
//     document.body.appendChild(a)
//     a.click()
//     document.body.removeChild(a)
//     ElMessage({
//       message: '下载成功',
//       grouping: true,
//       type: 'success'
//     })
//   }
//   return { downloadFileHooks }
// }
