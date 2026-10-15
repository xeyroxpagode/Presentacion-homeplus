import { createRequire } from 'node:module'
import path from 'node:path'
import fs from 'node:fs'

const REQUIRE_FROM = 'C:/Users/thega/Desktop/Figma-app/package.json'
const require = createRequire(REQUIRE_FROM)

const PNP = 'C:/Users/thega/Desktop/Figma-app/node_modules/.pnpm'

function findPlaywrightCore() {
  const direct = path.join(PNP, 'playwright-core@1.63.0', 'node_modules', 'playwright-core')
  if (fs.existsSync(path.join(direct, 'package.json'))) return direct
  const candidates = fs
    .readdirSync(PNP)
    .filter((d) => d.startsWith('playwright-core@'))
    .map((d) => path.join(PNP, d, 'node_modules', 'playwright-core'))
    .filter((p) => fs.existsSync(path.join(p, 'package.json')))
  if (!candidates.length) throw new Error('playwright-core not found in pnpm store')
  return candidates[0]
}

export const CORE_DIR = findPlaywrightCore()
const requireCore = createRequire(path.join(CORE_DIR, 'package.json'))
export const chromium = requireCore('playwright-core').chromium
export const PW_VERSION = requireCore('playwright-core/package.json').version

export const CHROMIUM_EXE =
  'C:/Users/thega/AppData/Local/ms-playwright/chromium-1243/chrome-win64/chrome.exe'

export const URL_BASE = 'http://127.0.0.1:8444/'
export const OUT_DIR =
  'C:/Users/thega/Desktop/HomeplusPresentacion01/HomePlus_Presentacion_FINAL/audit/runtime/session-05'