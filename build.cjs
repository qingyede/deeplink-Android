// fix-html.js
const fs = require('fs')
const path = require('path')

const htmlPath = path.resolve(__dirname, './dist/h5.html')
let html = fs.readFileSync(htmlPath, 'utf-8')

html = html
  .replace(/type="module"/g, '')
  .replace(/\scrossorigin/g, '')
  .replace(/\snomodule/g, '')

fs.writeFileSync(htmlPath, html)
console.log('✅ HTML 修复完成 ✅')
