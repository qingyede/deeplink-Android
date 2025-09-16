const fs = require('fs')
const path = require('path')

const src = path.resolve(__dirname, '../h5.html')
const outDir = path.resolve(__dirname, '../dist-file')
const dest = path.join(outDir, 'h5.html')

if (!fs.existsSync(src)) {
  console.error('❌ 未找到根目录 h5.html')
  process.exit(1)
}
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })

fs.copyFileSync(src, dest)
console.log('✅ 已复制 h5.html -> dist-file/h5.html')
