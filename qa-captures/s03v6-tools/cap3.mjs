import { chromium } from 'playwright'
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } })
await page.goto('http://localhost:5199/?dev=1&slide=2&step=7&s03p=1', { waitUntil: 'load' })
await page.waitForTimeout(600)
await page.screenshot({ path: '/tmp/s03v6-verify/step7-avatars.png', clip: { x: 240, y: 600, width: 1440, height: 380 } })
await browser.close()
console.log('ok')
