import { chromium } from 'playwright'
const BASE='http://localhost:5199'
const browser = await chromium.launch()
const page = await browser.newPage({ viewport:{width:1920,height:1080} })
for (let s=1;s<=9;s++){
  for (const [tag,step,p] of [['a',s,1],['b',s+1,0]]) {
    await page.goto(`${BASE}/?dev=1&slide=2&step=${step}&s03p=${p}&s03noauto=1`,{waitUntil:'load'})
    await page.waitForTimeout(420)
    await page.screenshot({path:`/tmp/s03v6-continuity/b${s}-${tag}.png`})
  }
}
await browser.close()
console.log('continuidad recapturada')
