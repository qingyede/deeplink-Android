import { iconMap } from '@/constant/APP'
export function getDeviceIcon(deviceName: string): string {
  if (!deviceName) return iconMap.unknown

  const lowerName = deviceName.toLowerCase()

  const mapping: { [keyword: string]: string } = {
    windows: 'windows', // 映射到 iconMap 的键
    macos: 'macos',
    ubuntu: 'ubuntu',
    debian: 'debian',
    fedora: 'fedora',
    redhat: 'redhat',
    centos: 'centos',
    arch: 'arch',
    android: 'android',
    ios: 'ios',
    chromeos: 'chromeos',
    opensuse: 'opensuse',
    manjaro: 'manjaro',
    linuxmint: 'linuxmint',
    kali: 'kali',
    alpine: 'alpine',
    oraclelinux: 'oraclelinux',
    raspbian: 'raspbian',
    solaris: 'solaris',
    freebsd: 'freebsd',
    iphone: 'iphone',
    huawei: 'huawei',
    androidPhone: 'androidPhone',
    unknown: 'unknown',
  }

  for (const keyword in mapping) {
    if (lowerName.includes(keyword)) {
      const key = mapping[keyword] // 获取 iconMap 的键，例如 "iphone"
      const icon = iconMap[key] // 查找 iconMap["iphone"]
      if (icon) {
        return icon // 返回 "logos:apple"
      } else {
        console.warn(`[getDeviceIcon] matched keyword "${keyword}", but iconMap["${key}"] not found`)
        return iconMap.unknown
      }
    }
  }

  console.warn(`[getDeviceIcon] no keyword matched for deviceName: "${deviceName}"`)
  return iconMap.unknown
}
