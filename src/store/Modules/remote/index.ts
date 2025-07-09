import { defineStore } from 'pinia'
import { playWithUs } from '@/api/remote/index'

export const useRemoteStore = defineStore('remote', () => {
  // 列表数据
  const cardList = reactive({
    card1: [
      {
        imgurl: '',
        name: '',
        link: '',
      },
    ],
    card2: [
      {
        imgurl: '',
        name: '',
        link: '',
      },
    ],
    card3: [
      {
        imgurl: '',
        name: '',
        link: '',
      },
    ],
    loading1: false,
    loading2: false,
    loading3: false,
  })
  // 获取和我们一起玩列表数据-首页
  const playWithUsH1 = async (params) => {
    cardList.loading1 = true
    const { data: res } = await playWithUs(params)
    cardList.loading1 = false
    if (res.success) {
      console.log(res, 'res')
      cardList.card1 = res.content
    }
  }

  // 获取和我们一起玩列表数据-首页
  const playWithUsH2 = async (params) => {
    cardList.loading2 = true
    const { data: res } = await playWithUs(params)
    cardList.loading2 = false
    if (res.success) {
      console.log(res, 'res')
      cardList.card2 = res.content
      console.log(cardList.card2, 'cardList.card2cardList.card2cardList.card2')
    }
  }

  // 获取和我们一起玩列表数据-首页
  const playWithUsH3 = async (params) => {
    cardList.loading3 = true
    const { data: res } = await playWithUs(params)
    cardList.loading3 = false
    if (res.success) {
      console.log(res, 'res')
      cardList.card3 = res.content
    }
  }
  return {
    playWithUsH1,
    playWithUsH2,
    playWithUsH3,
    cardList,
  }
})
