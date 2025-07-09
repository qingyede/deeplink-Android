// utils/convertToUsd.ts
export function convertDlcToUsd(dlcAmount: number, dlcPrice: number): number {
  console.log(dlcAmount, dlcPrice, 'PPPPPPPP')
  if (dlcAmount < 0 || dlcPrice < 0) {
    throw new Error('DLC 数量和单价不能为负数')
  }
  return parseFloat((dlcAmount * dlcPrice).toFixed(5))
}

export function convertDbcToUsd(dbcAmount: number, dbcPrice: number): number {
  if (dbcAmount < 0 || dbcPrice < 0) {
    throw new Error('DBC 数量和单价不能为负数')
  }
  return parseFloat((dbcAmount * dbcPrice).toFixed(5))
}
