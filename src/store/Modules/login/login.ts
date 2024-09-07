import { defineStore } from 'pinia'
import { LoginState, LoginActions } from './type' // 导入类型定义

const loginStore = defineStore<'login', LoginState, {}, LoginActions>({
  id: 'login',
  state: (): LoginState => {
    return {
      row: '666',
      token: '88888888888',
    }
  },
  getters: {
    isLoggedIn: (state): boolean => {
      return !!state.token
    },
  },
  actions: {
    updateToken(newToken: string) {
      this.token = newToken
    },
  },
})

export default loginStore
