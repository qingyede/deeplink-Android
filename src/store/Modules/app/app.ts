import { defineStore } from 'pinia'
import { AppState, AppActions } from './type' // 导入类型定义

const appStore = defineStore<'app', AppState, {}, AppActions>({
  id: 'app',
  state: (): AppState => {
    return {
      theme: '666',
      token: '88888888888',
    }
  },
  actions: {
    // 切换主题（暗亮）
    changeTheme(): void {
      this.theme = this.theme === 'dark' ? 'light' : 'dark'
    },
  },
  getters: {},
  persist: true,
})

export default appStore
