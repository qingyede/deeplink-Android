// 定义 state 的类型
export interface LoginState {
  row: string;
  token: string;
}

// 定义 actions 的类型
export interface LoginActions {
  updateToken: (newToken: string) => void;
}
