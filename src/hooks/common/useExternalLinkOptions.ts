// src/hooks/common/useOpenExternalLink.ts
export function useOpenExternalLink() {
  /**
   * 打开外部链接
   * @param url 要跳转的URL
   * @param isShowTitle 是否在Native里显示标题栏（默认true）
   */
  const openExternalLink = (url: string, isShowTitle: boolean = true) => {
    if (window.dlc?.toNative) {
      window.dlc.toNative(
        JSON.stringify({
          action: 3001,
          data: {
            url,
            isShowTitle,
          },
        })
      )
    } else {
      window.open(url, '_blank')
    }
  }

  return {
    openExternalLink,
  }
}
