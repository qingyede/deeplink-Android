export function useMaskAddress() {
  /**
   * 脱敏处理钱包地址，例如：
   * 输入： 0x4F14Ef67C43FDCB39b88E502b1DF20c913A75C6C
   * 输出： 0x4F14...5C6C
   */
  const maskAddress = (address: string, start = 6, end = 4): string => {
    if (!address || address.length < start + end + 2) return address
    const prefix = address.slice(0, start)
    const suffix = address.slice(-end)
    return `${prefix}...${suffix}`
  }

  return {
    maskAddress,
  }
}
