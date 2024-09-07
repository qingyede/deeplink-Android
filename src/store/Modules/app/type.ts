// 定义 state 的类型
export interface AppState {
  theme: string
  token: string
}

// 定义 actions 的类型
export interface AppActions {
  changeTheme: (newToken: string) => void
}
