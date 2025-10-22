// store/Modules/app/index.ts
import { defineStore } from 'pinia'

export const appStore = defineStore('app', {
  state: () => ({
    // 判断是否注册了钱包
    isWalletRegistered: false,
    // 当前语言
    lang: 'en',
    // 当前模式是不是积分
    mode: true,
    // 用户钱包地址
    address: '',
    // keystore
    keystore: '',
    // 用户密码
    password: '',
    // 设备 id
    deviceId: '',
    // 用户 token
    token: '',
    // 真实设备信息
    deviceInfo: null as any,
    // 用户填写的记录（设备识别）-id
    Inputoptions: [] as { label: string; value: string; password: string }[],
    // 使用自动虚拟摇杆
    useAutoVirtualJoystick: true,
    // 使用虚拟摇杆时禁用鼠标
    disableMouseWhenJoystick: true,
  }),
  persist: true,
})
