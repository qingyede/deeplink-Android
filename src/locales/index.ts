import en from './lang/en.json'
import zh from './lang/zh.json'
import ko from './lang/ko.json'

export interface Messages {
  [key: string]: any
}

const messages: Messages = {
  en,
  zh,
  ko,
}

export default messages
