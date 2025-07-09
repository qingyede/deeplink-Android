import { getDbcBalance, fetchDlcBalance } from '@/utils/wallet/dbcProvider'
import { ref } from 'vue'
import { appStore } from '@/store/Modules/app'

export const useGetDbcAndDlcNumber = () => {
  const app = appStore()
  let homeCardLoading = ref(false)
  let dbcNumber = ref('0.00')
  let dlcNumber = ref('0.00')

  const getDbcAndDlcNumber = async () => {
    homeCardLoading.value = true
    // ✅ 查询原生币 DBC 余额
    dbcNumber.value = await getDbcBalance(app.address)
    dlcNumber.value = (await fetchDlcBalance(app.address)) as any
    homeCardLoading.value = false
  }

  onMounted(() => {
    if (app.address) {
      // ✅ 查询原生币 DBC 余额
      getDbcAndDlcNumber()
    }
  })

  return { getDbcAndDlcNumber, homeCardLoading, dbcNumber, dlcNumber }
}
