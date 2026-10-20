import { chromium } from 'playwright'
const BASE = 'http://localhost:5199'
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } })
await page.goto(`${BASE}/?dev=1&slide=2&step=0&s03t=3000`, { waitUntil: 'load' })
await page.waitForTimeout(2200) // deja terminar el portal
await page.screenshot({ path: '/tmp/s03v6-captures/x-step0-settled.png' })
await browser.close()
console.log('done')
