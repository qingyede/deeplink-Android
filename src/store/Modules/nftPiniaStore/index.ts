import { defineStore } from 'pinia'
import { priceStore } from '@/store/Modules/price/index'
import { useI18n } from 'vue-i18n'
import { getDbcProvider } from '@/utils/wallet/dbcProvider'
import { getContract } from '@/utils/common/contracts'
import { appStore } from '@/store/Modules/app/index'
import nfts from '@/assets/img/nfts.png'

export const useBuyNftStore = defineStore('buyNft', () => {
  const price = priceStore()
  const { t } = useI18n()
  const app = appStore()

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

  // 获取我的nft列表
  const myNftList = ref<any[]>([])
  // 判断是否有nft
  const hasNft = computed(() => {
    return myNftList.value.length > 0 && myNftList.value.some((item) => item.NFTStatus === 'activated')
  })
  const nftLoading = ref(false)

  // 工具函数：格式化剩余时间
  function formatRemainingTime(ms: number): string {
    if (ms <= 0) return '已过期'

    const days: any = Math.floor(ms / (1000 * 60 * 60 * 24))
    const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60))

    let parts: any = []
    if (days > 0) parts.push(`${days}${t('home.day')}`)
    if (hours > 0 || days > 0) parts.push(`${hours}${t('home.hour')}`)
    parts.push(`${minutes}${t('home.minute')}`)

    return parts.join('')
  }
  const getMyNftListH = async () => {
    console.log('📥 正在从链上获取我的 NFT 列表...')
    nftLoading.value = true
    try {
      const provider = getDbcProvider()
      const NFTContract = getContract('NFT_CONTRACT', provider)

      // 获取所有 Token ID
      const tokenIds: bigint[] = await NFTContract.getTokenIdsByAddress(app.address)
      if (tokenIds.length === 0) {
        nftLoading.value = false
        myNftList.value = []
        console.log('✅ 当前钱包未持有任何 NFT')
        // window.$message?.warning(t('app.noNftHeld'))

        return
      }

      const now = Date.now()
      const nftList: any[] = []

      for (const tokenId of tokenIds) {
        const id = Number(tokenId)

        // 1. 获取元数据
        // let metadata = {}
        // try {
        //   const tokenUri = await NFTContract.tokenURI(id)
        //   const res = await fetch(tokenUri)
        //   // metadata = await res.json()
        // } catch (e) {
        //   console.warn(`⚠️ TokenId ${id} 元数据加载失败`)
        // }

        // 2. 获取链上状态信息
        const [versionType, expireType, expireTime] = await NFTContract.tokenId2NFTInfo(id)
        const expireTimestamp = Number(expireTime) * 1000
        const status = expireTime > 0 ? (expireTimestamp > now ? 'activated' : 'expired') : 'notActivated'
        // ⛔ 过滤掉已过期超过 3 天的 NFT
        if (status === 'expired' && now - expireTimestamp > 3 * 24 * 60 * 60 * 1000) {
          console.log(`💥 TokenId ${id} 已过期超3天，跳过`)
          continue
        }

        const remainingMs = expireTimestamp - now

        // 3. 合并并推入数组
        nftList.push({
          tokenId: id,
          // name: metadata['name'] || `NFT #${id}`,
          image: nfts,
          // description: metadata['description'] || '',
          version_type: Number(versionType),
          expire_type: Number(expireType),
          expire_time: expireTimestamp,
          NFTStatus: status,
          timeLeftText: status === 'activated' ? formatRemainingTime(remainingMs) : '—',
        })
      }
      nftLoading.value = false
      myNftList.value = nftList
      console.log('🎉 成功获取 NFT 列表:', nftList)
    } catch (err) {
      console.error('❌ 获取我的 NFT 列表失败:', err)
      myNftList.value = []
    }
  }

  return {
    nftList,
    nftListLoading,
    nftListEndTime,
    getMyNftListH,
    myNftList,
    nftLoading,
    hasNft,
  }
})
