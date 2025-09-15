export function parseName(input: string): string {
  console.log(input, 'MMMM')
  if (typeof input !== 'string') return ''

  try {
    // 尝试解析 JSON
    const parsed = JSON.parse(input)

    // 确保解析结果是对象且包含 notes
    if (parsed && typeof parsed === 'object' && 'name' in parsed) {
      return String(parsed.name ?? '')
    }

    // 如果不是对象或没有 notes，就返回原字符串
    return input
  } catch {
    // 解析出错说明不是 JSON，直接返回原字符串
    return input
  }
}

export function parseNotes(input: string): string {
  if (typeof input !== 'string') return ''

  try {
    // 尝试解析 JSON
    const parsed = JSON.parse(input)

    // 确保解析结果是对象且包含 notes
    if (parsed && typeof parsed === 'object' && 'notes' in parsed) {
      return String(parsed.notes ?? '')
    }

    // 如果不是对象或没有 notes，就返回原字符串
    return ''
  } catch {
    // 解析出错说明不是 JSON，直接返回原字符串
    return ''
  }
}
