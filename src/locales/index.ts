import en from './lang/en.json'
import zh from './lang/zh.json'
import ko from './lang/ko.json'
import ja from './lang/ja.json'
import ru from './lang/ru.json'
import vn from './lang/vn.json'

export interface Messages {
  [key: string]: any
}

const messages: Messages = {
  en,
  zh,
  ko,
  ja,
  ru,
  vn,
}

export default messages
