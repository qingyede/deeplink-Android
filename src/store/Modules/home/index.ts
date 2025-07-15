import { defineStore } from 'pinia'

export const useHomeStore = defineStore('home', () => {
  const activeTab = ref('Crypto')
  return {
    activeTab,
  }
})
