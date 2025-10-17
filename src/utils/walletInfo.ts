import { ApiPromise, WsProvider, Keyring } from '@polkadot/api'
import { cryptoWaitReady, blake2AsHex, randomAsU8a } from '@polkadot/util-crypto'
import { formatBalance, BN_TEN, isHex, stringToU8a, u8aToHex, hexToU8a, stringToHex, hexToString } from '@polkadot/util'
import BN from 'bn.js'
import { ethers } from 'ethers'

const node = {
  dbc: 'wss://info1.dbcwallet.io', // 公链正式链
  dbctest: 'wss://infotest.dbcwallet.io:7780',
}

let api: any = null

// 链上交互
export const GetApi = async () => {
  if (!api) {
    const provider = new WsProvider(node.dbc)
    api = await ApiPromise.create({
      provider,
    })
  }
  return { api }
}

// 创建账户
const keyring = new Keyring({ type: 'sr25519' })
export const createAccountFromSeed = async () => {
  if (keyring) {
    await cryptoWaitReady()
    const seed = u8aToHex(randomAsU8a())
    const pair = keyring.addFromUri(seed)
    return {
      seed,
      pair,
    }
  }
  return null
}

export const importAccountFromSeed = async (seed) => {
  await cryptoWaitReady()
  return keyring.addFromUri(seed)
}

// 导出私钥
// export const exportAccountForKeystore = (pair, password) => {
//   let jsonStr = localStorage.getItem('pair')
//   if (!jsonStr) {
//     jsonStr = JSON.stringify(pair.toJson(password))
//   }
//   return jsonStr
// }

// 保存在localStore
export const savePair = (pair, password) => {
  const jsonString = JSON.stringify(pair.toJson(password))
  localStorage.setItem('pair', jsonString)
}

// 导入keystore
export const importAccountFromKeystore = (file) => {
  const pairs = keyring.getPairs()
  if (pairs.length > 0) {
    keyring.removePair(pairs[0].address)
  }
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.readAsText(file)
    reader.onload = (e) => {
      const fileText = e.target?.result
      if (fileText) {
        const json = JSON.parse(String(fileText))
        const pair = keyring.addFromJson(json)
        resolve(pair)
      }
    }
  })
}

// 工具
export function isHexSeed(seed) {
  return isHex(seed) && seed.length === 66
}

export const getPairs = () => {
  return keyring.getPairs() || []
}
export const getPair = (address) => {
  return keyring.getPair(address)
}
// 获取当前账户
export const getCurrentPair = () => {
  const pairs = keyring.getPairs()
  if (pairs.length > 0) {
    return pairs[0]
  } else {
    return initFromLocalstorage()
  }
}

// 从本地存储恢复账户
export const initFromLocalstorage = () => {
  const jsonStr = localStorage.getItem('pair')
  if (keyring && jsonStr) {
    const json = JSON.parse(jsonStr)
    return importAccountFromJson(json)
  }
  return null
}

export const importAccountFromJson = (json) => {
  if (keyring) {
    return keyring.addFromJson(json)
  }
  return null
}

// 移除账户
export const removePair = (address) => {
  keyring.removePair(address)
  localStorage.removeItem('pair')
}

// 生成签名
// data = pair
export const CreateSignature = async (
  nonce: number,
  data: any,
  password: string,
  type: 'seed' | 'json',
  walletType: 'EVM' | 'DBC' = 'EVM'
): Promise<{ nonce: number; signature: string }> => {
  await cryptoWaitReady()

  if (walletType === 'EVM') {
    // EVM 签名逻辑
    try {
      // 解密 keystore（data 是 JSON 字符串或对象）
      const wallet = await ethers.Wallet.fromEncryptedJson(typeof data === 'string' ? data : JSON.stringify(data), password)
      // 签名 nonce（字符串格式）
      const message = nonce.toString()
      const signature = await wallet.signMessage(message)
      return { nonce, signature }
    } catch (error) {
      console.error('EVM 签名失败:', error)
      throw new Error('签名失败')
    }
  } else {
    // DBC 签名逻辑
    try {
      let signUrl
      if (type === 'seed') {
        signUrl = new Keyring({ type: 'sr25519' }).addFromUri(data)
      } else {
        const jsonStr = typeof data === 'string' ? JSON.parse(data) : data
        signUrl = new Keyring({ type: 'sr25519' }).addFromJson(jsonStr)
        signUrl.unlock(password)
      }
      const signature = signUrl.sign(nonce.toString())
      return { nonce, signature: u8aToHex(signature) }
    } catch (error) {
      console.error('DBC 签名失败:', error)
      throw new Error('签名失败')
    }
  }
}

/**
 * dbcPriceOcw 获取链上DBC的实时价格
 *
 * @return data:返回链上DBC的实时价格
 */
export const dbcPriceOcw = async () => {
  await GetApi()
  let de = await api.query.dbcPriceOCW.avgPrice()
  return de.toJSON()
}

let CallBack_data = {
  index: 0,
  msg: '',
  section: '',
  success: false,
}

export const inputToBn = (input, siPower, basePower) => {
  const isDecimalValue = input.match(/^(\d+)\.(\d+)$/)

  let result

  if (isDecimalValue) {
    const div = new BN(input.replace(/\.\d*$/, ''))
    const modString = input.replace(/^\d+\./, '').substr(0, api?.registry.chainDecimals[0])
    const mod = new BN(modString)
    result = div.mul(BN_TEN.pow(siPower)).add(mod.mul(BN_TEN.pow(new BN(basePower - modString.length))))
  } else {
    result = new BN(input.replace(/[^\d]/g, '')).mul(BN_TEN.pow(siPower))
  }

  return result
}

const getFloat = (number) => {
  number = number / Math.pow(10, 15)
  number = Math.round(number * 10000) / 10000
  number = Number(number).toFixed(4)
  return number
}

// 获得当前账户的余额
export const onGetBalance = async (address) => {
  await GetApi()
  const balance = await api.query.system.account(address)
  let returnData = balance.toJSON()
  let reserved = getFloat(returnData.data.reserved) // 保留
  let feeFrozen = getFloat(returnData.data.feeFrozen) // 冻结
  let transfer = getFloat(Number(returnData.data.free) - Number(returnData.data.feeFrozen)) // 可转账
  let count = getFloat(Number(returnData.data.free) + Number(returnData.data.reserved)) // 全部
  return {
    transfer,
    reserved,
    feeFrozen,
    count,
  }
}

// 获得当前块高
export const onGetBlockNumber = async () => {
  await GetApi()
  const BlockNumber = await api.query.system.number()
  return BlockNumber.toJSON()
}

export const getAndroid = () => {
  let android: any = ''
  const id = localStorage.getItem('android')
  if (!id) {
    // 生成第一位数字，确保它是1到9之间的数字
    let firstDigit = Math.floor(Math.random() * 9) + 1
    // 生成后面8位数字
    let remainingDigits = ''
    for (let i = 0; i < 8; i++) {
      remainingDigits += Math.floor(Math.random() * 10)
    }
    const new_id = parseInt(firstDigit.toString() + remainingDigits)
    localStorage.setItem('android', new_id as any)
    android = new_id
  } else {
    android = id
  }
  return android
}
