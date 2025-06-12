// import { createApp } from 'vue'
// import ModalComponent from '@/components/dialog/dialog.vue'
// import CodeDialog from '@/components/dialog/codeDialog.vue'

// export function openModal(options) {
//   const { title, message, onConfirm, onClose, str, isCode } = options

//   // 创建一个 DOM 容器
//   const modalContainer = document.createElement('div')
//   document.body.appendChild(modalContainer)

//   // 创建一个 Vue 实例并挂载到容器
//   const modalApp = createApp(isCode ? CodeDialog : ModalComponent, {
//     title,
//     message,
//     str,
//     onConfirm: async () => {
//       try {
//         if (onConfirm) {
//           await onConfirm()
//         }
//       } finally {
//         // 确保在 onConfirm 完成后卸载组件
//         modalApp.unmount()
//         document.body.removeChild(modalContainer)
//       }
//     },
//     onClose: () => {
//       if (onClose) {
//         onClose()
//       }
//       modalApp.unmount() // 卸载组件
//       document.body.removeChild(modalContainer) // 移除容器
//     }
//   })

//   modalApp.mount(modalContainer)
// }
