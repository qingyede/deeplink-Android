export const useScroll = () => {
  const scrollLock = () => {
    // 滚动锁定
    document.body.style.overflow = 'hidden'
  }
  const scrollUnlock = () => {
    // 滚动解锁
    document.body.style.overflow = 'auto'
  }
  return { scrollLock, scrollUnlock }
}
