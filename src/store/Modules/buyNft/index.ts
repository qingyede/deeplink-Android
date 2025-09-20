import { defineStore } from 'pinia'
import { getNftList, buyNftSuccess, buyNftByPoint } from '@/api/buyNft/index'
import { priceStore } from '@/store/Modules/price/index'
import { useI18n } from 'vue-i18n'
import { getErc20Contract, DLC_TOKEN_ADDRESS } from '@/utils/wallet/dbcProvider'
import { useWalletSigner } from '@/hooks/wallet/useSignTransaction'
import { ethers } from 'ethers'
import { NFTTRANSFER_ADDRESS } from '@/utils/common/contracts'
import { getDbcProvider } from '@/utils/wallet/dbcProvider'
import { getContract, DLCP_TOKEN_ADDRESS, DLCP_RECEIVER } from '@/utils/common/contracts'
import { appStore } from '@/store/Modules/app/index'
import nfts from '@/assets/img/nfts.png'
import { useGetDlcPrice } from '@/hooks/store/useGetDlcPrice'
import { useHomeStore } from '@/store/Modules/home/index'
import { useRouter, useRoute } from 'vue-router'

export const useBuyNftStore = defineStore('buyNft', () => {
  const price = priceStore()
  const { t } = useI18n()
  const app = appStore()
  const { dlc_price } = useGetDlcPrice()
  const home = useHomeStore()

  const router = useRouter()
  const route = useRoute()
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
      toDlcNumber: 0,
      value: 0,
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
          price: price.useLocalizedCurrency(item.price_usdt * item.discount, 2),
          month: map[index],
        })

        const vertionStr = t('Store.nft.vertion', {
          name: nftName,
          month: map[index],
        })
        return {
          price: priceStr,
          vertion: vertionStr,
          percent: item.discount_test,
          v: price.useLocalizedCurrency(item.price_usdt, 2),
          type: item.expire_time_type,
          value: item.price_usdt * item.discount,
          toDlcNumber: Number((item.price_usdt * item.discount) / dlc_price.value).toFixed(5),
        }
      })
    }
  }

  // 购买nft-代币模式
  async function purchaseNFTFlow({ dlcAmount, saveData }: { dlcAmount: number; saveData: any }) {
    console.log('购买nft购买nft购买nft购买nft')
    const { ensureWallet } = useWalletSigner(t)
    const result = await ensureWallet()

    console.log(result, 'resultresultresultresult')
    if (!result) return

    const { signer, address: purchaser, dialog } = result
    const dlcContract = getErc20Contract(DLC_TOKEN_ADDRESS, signer)

    try {
      // ✅ 1. 转账 DLC
      const decimals = await dlcContract.decimals()
      const amountWei = ethers.parseUnits(String(dlcAmount), decimals)

      const tx = await dlcContract.transfer(NFTTRANSFER_ADDRESS, amountWei)
      const receipt = await tx.wait()
      if (receipt.status !== 1) throw new Error('转账失败')

      // ✅ 2. 获取交易哈希和区块高度
      const txHash = receipt.hash
      const blockNumber = receipt.blockNumber

      console.log('✅ 交易哈希:', txHash)
      console.log('✅ 区块高度:', blockNumber)

      // ✅ 3. 对购买地址（小写）签名
      const signature = await signer.signMessage(saveData.purchaser)

      // 存储数据到数据库
      const { data: res } = await buyNftSuccess({
        dlc_num: dlcAmount,
        ...saveData,
        blockNumber: blockNumber,
        hash: txHash,
        signature: signature,
        invite_code: '',
        invite_wallet: '',
      })
      if (!res.success) throw new Error(res.message || '购买失败')
      // 🎉 购买成功
      window.$message?.success(t('app.purchaseSuccess'))
      dialog.destroy?.()
    } catch (err: any) {
      console.log(err, 'errerr')
      window.$message?.error(err.message || t('app.purchaseFailed'))
      dialog.loading = false
      dialog.positiveText = t('app.confirm')
      console.error('[NFT 购买出错]', err)
      dialog.destroy?.()
    }
  }

  // 购买 NFT -- 积分模式
  async function purchaseNFTFlowByPoint({
    pointAmount, // 积分数量（人类可读，比如 1000.123）
    saveData,
  }: {
    pointAmount: number
    saveData: any
  }) {
    console.log('购买nft购买nft购买nft购买nft')
    const { ensureWallet } = useWalletSigner(t)
    const result = await ensureWallet()

    console.log(result, 'resultresultresultresult')
    if (!result) return

    const { signer, address: purchaser, dialog } = result

    // 1. 获取合约实例（DLCP）
    const dlcpContract = getErc20Contract(DLCP_TOKEN_ADDRESS, signer)

    try {
      // ✅ 2. 处理金额：把积分数量转成最小单位（wei）
      const decimals = await dlcpContract.decimals()
      const amountWei = ethers.parseUnits(String(pointAmount), decimals)

      // ✅ 3. 转账积分到固定地址
      const tx = await dlcpContract.transfer(DLCP_RECEIVER, amountWei)
      const receipt = await tx.wait()
      if (receipt.status !== 1) throw new Error('积分转账失败')

      // ✅ 4. 获取交易哈希和区块高度
      const txHash = receipt.hash
      const blockNumber = receipt.blockNumber

      console.log('✅ [积分NFT] 交易哈希:', txHash)
      console.log('✅ [积分NFT] 区块高度:', blockNumber)

      // ✅ 5. 对购买地址（小写）签名
      const signature = await signer.signMessage(saveData.purchaser)

      // ✅ 6. 存储数据到数据库（模拟接口）
      // ⚠️ 这里我模拟一个异步接口调用，和你代币模式的 buyNftSuccess 一样
      const { data: res } = await buyNftByPoint({
        point_num: pointAmount,
        ...saveData,
        blockNumber: blockNumber,
        hash: txHash,
        signature,
        invite_code: '',
        invite_wallet: '',
      })

      if (!res.success) throw new Error(res.message || '积分购买失败')
      // router.push({ name: 'home' })
      // home.activeTab = 'NFTs'
      // 🎉 成功提示
      window.$message?.success(t('app.purchaseSuccess'))
      dialog.destroy?.()
      getMyNftListH()
    } catch (err: any) {
      console.error('[NFT 积分购买出错]', err)
      window.$message?.error(err.message || '积分购买失败')
    }
  }

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

  /**
   * 发起 NFT 转账流程
   * @param tokenId NFT 编号
   * @param toAddress 接收地址
   */
  async function transferNFTFlow(tokenId: number, toAddress: string) {
    const { ensureWallet } = useWalletSigner(t)
    const result = await ensureWallet()
    if (!result) return

    const { signer, address: fromAddress, dialog } = result
    // const nftContract = new ethers.Contract(CrownNFT, CrownNFT_ABI, signer)

    const nftContract = getContract('NFT_CONTRACT', signer)

    try {
      console.log('🚀 开始转账 NFT', { tokenId, fromAddress, toAddress })

      // 发起转账（使用 safeTransferFrom 更安全）
      const tx = await nftContract['safeTransferFrom(address,address,uint256)'](fromAddress, toAddress, tokenId)

      const receipt = await tx.wait()
      if (receipt.status !== 1) throw new Error('NFT 购买失败')

      window.$message?.success(t('app.nftTransferSuccess'))
      dialog.destroy?.()
      return true
    } catch (err: any) {
      console.error('[NFT 转账失败]', err)
      window.$message?.error(t('app.nftPurchaseFailed'))
      dialog.loading = false
      dialog.positiveText = t('app.confirm')
    }
  }

  /**
   * 激活 NFT
   * @param tokenId 要激活的 NFT 编号
   */
  async function activeNFTFlow(tokenId: number) {
    const { ensureWallet } = useWalletSigner(t)
    const result = await ensureWallet()
    if (!result) return

    const { signer, dialog } = result

    try {
      const nftContract = getContract('NFT_CONTRACT', signer)

      console.log('🚀 正在激活 NFT:', tokenId)

      // 调用合约 active 方法
      const tx = await nftContract.active(tokenId)
      const receipt = await tx.wait()

      if (receipt.status !== 1) throw new Error('激活失败')

      window.$message?.success(t('app.nftActivationSuccess'))
      dialog.destroy?.()
      getMyNftListH()
    } catch (err: any) {
      console.error('[激活 NFT 失败]', err)
      window.$message?.error(t('app.nftActivationFailed'))
      dialog.loading = false
      dialog.positiveText = t('app.confirm')
    }
  }
  return {
    getNftListH,
    nftList,
    nftListLoading,
    nftListEndTime,
    purchaseNFTFlow,
    getMyNftListH,
    myNftList,
    nftLoading,
    transferNFTFlow,
    activeNFTFlow,
    hasNft,
    purchaseNFTFlowByPoint,
  }
})
