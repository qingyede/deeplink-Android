// src/utils/getDeviceName.ts
import Bowser from 'bowser'

export function getDeviceName(): string {
  const parser = Bowser.getParser(window.navigator.userAgent)
  const info: any = parser.getResult()

  let name = 'Unknown Device'

  const platformType = info.platform?.type || ''
  const os = info.os?.name || ''
  const osVersion = info.os?.version || ''
  const deviceVendor = info.device?.vendor || ''
  const deviceModel = info.device?.model || ''

  if (platformType === 'desktop') {
    name = `${os} ${osVersion}`.trim()
  } else if (platformType === 'tablet') {
    name = `${os || 'Tablet'}`
  } else if (platformType === 'mobile') {
    if (/ios/i.test(os)) {
      name = 'Apple iPhone'
      if (deviceModel && !/iphone/i.test(deviceModel)) {
        name = `Apple iPhone (${deviceModel})`
      }
    } else if (/android/i.test(os)) {
      name = deviceVendor || 'Android'
      if (deviceModel) {
        name = `${name} (${deviceModel})`
      }
    } else {
      name = os || 'Mobile'
      if (deviceVendor) {
        name = `${deviceVendor} ${name}`
      }
      if (deviceModel) {
        name += ` (${deviceModel})`
      }
    }
  } else {
    name = os || 'Desktop/PC'
  }

  return name
}
