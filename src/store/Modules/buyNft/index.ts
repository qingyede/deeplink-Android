import { defineStore } from 'pinia'
import { getNftList } from '@/api/buyNft/index'
import { priceStore } from '@/store/Modules/price/index'
import { useI18n } from 'vue-i18n'

export const useBuyNftStore = defineStore('buyNft', () => {
  const price = priceStore()
  const { t } = useI18n()

  // nfts列表数据loading
  const nftListLoading = ref(true)
  // nfts列表活动结束日期
  const nftListEndTime: any = ref(null)

  // nfts列表数据
  let nftList = ref([
    {
      price: '暂无数据',
      vertion: '暂无数据',
      percent: `0%`,
      v: 0,
    },
  ])
  // 获取nfts列表数据
  const getNftListH = async () => {
    nftListLoading.value = true
    const { data: res } = await getNftList()
    nftListLoading.value = false
    if (res.success && res.content.length > 0) {
      console.log(res, '获取nfts列表数据')
      nftListEndTime.value = res.date_text

      nftList.value = res.content.map((item: any, index: number) => {
        let map = {
          0: 1,
          1: 3,
          2: 6,
          3: 12,
        }

        const nftName = t('Store.nft.name')

        const priceStr = t('Store.nft.price', {
          price: price.useLocalizedCurrency(item.price_usdt, 2),
          month: map[index],
        })

        const vertionStr = t('Store.nft.vertion', {
          name: nftName,
          month: map[index],
        })
        return {
          // price: `${price.useLocalizedCurrency(item.price_usdt, 2)}/${map[index]}个月`,
          // vertion: `专业版皇冠NFT ${map[index]}个月`,

          price: priceStr,
          vertion: vertionStr,
          percent: item.discount_test,
          v: price.useLocalizedCurrency(item.price_usdt * item.discount, 2),
          type: item.expire_time_type,
        }
      })
    }
  }

  return { getNftListH, nftList, nftListLoading, nftListEndTime }
})
