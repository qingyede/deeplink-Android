export function objectToBase64(obj: Record<string, any>): string {
  const jsonString = JSON.stringify(obj)
  const utf8Bytes = new TextEncoder().encode(jsonString)
  const base64String = btoa(String.fromCharCode(...utf8Bytes))
  return base64String
}
