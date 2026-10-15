import fs from 'node:fs'
import path from 'node:path'
import { chromium, CHROMIUM_EXE, PW_VERSION, URL_BASE, OUT_DIR } from './pw.mjs'

const W = 1280
const H = 720
const LAST = { slide: 'S07', step: 1 }

const slideIndex = { S01: 0, S02: 1, S03: 2, S04: 3, S05: 4, S06: 5, S07: 6 }
const stepCount = { S01: 11, S02: 7, S03: 1, S04: 6, S05: 4, S06: 6, S07: 2 }

const STATES = []
for (const [sid, count] of Object.entries(stepCount)) {
  for (let i = 0; i < count; i += 1) STATES.push({ sid, step: i, name: `${sid}_step${String(i).padStart(2, '0')}` })
}

const probe = () => {
  const canvas = document.querySelector('.presentation-canvas')
  const canvasBox = canvas ? canvas.getBoundingClientRect() : null
  const scale = canvasBox && canvasBox.width ? canvasBox.width / 1280 : 1
  const cs = (el) => (el ? getComputedStyle(el) : null)
  const box = (el) => {
    if (!el) return null
    const r = el.getBoundingClientRect()
    return {
      x: +(((r.left - (canvasBox ? canvasBox.left : 0)) / scale)).toFixed(2),
      y: +(((r.top - (canvasBox ? canvasBox.top : 0)) / scale)).toFixed(2),
      w: +(r.width / scale).toFixed(2),
      h: +(r.height / scale).toFixed(2),
    }
  }
  const visible = (el) => {
    const s = cs(el)
    if (!s) return false
    if (s.display === 'none' || s.visibility === 'hidden') return false
    if (parseFloat(s.opacity) === 0) return false
    const r = el.getBoundingClientRect()
    return r.width > 0 && r.height > 0
  }
  const txt = (el) => (el ? (el.innerText || el.textContent || '').replace(/\s+/g, ' ').trim() : null)

  // max non-stage transform scale among visible elements
  let maxScale = 0
  let maxScaleEl = null
  for (const el of document.querySelectorAll('.presentation-canvas *')) {
    const s = cs(el)
    if (!s || s.display === 'none' || s.visibility === 'hidden') continue
    if (parseFloat(s.opacity) === 0) continue
    const r = el.getBoundingClientRect()
    if (r.width === 0 || r.height === 0) continue
    const t = s.transform
    if (!t || t === 'none') continue
    const m = new DOMMatrixReadOnly(t)
    if (m.a > maxScale) { maxScale = +m.a.toFixed(4); maxScaleEl = el.className || el.tagName }
  }

  const state = {
    slideIndexAttr: document.querySelector('.presentation-scene')?.getAttribute('aria-label') ?? null,
    canvasScale: +scale.toFixed(4),
    canvasClient: canvas ? [canvas.clientWidth, canvas.clientHeight] : null,
    canvasScroll: canvas ? [canvas.scrollWidth, canvas.scrollHeight] : null,
    canvasBg: cs(canvas)?.backgroundColor ?? null,
    maxTransformScale: maxScale,
    maxTransformScaleElement: String(maxScaleEl),
    visibleTexts: (() => {
      const out = []
      for (const el of document.querySelectorAll('.presentation-canvas *')) {
        if (el.children.length) continue
        const t = txt(el)
        if (!t) continue
        if (!visible(el)) continue
        if (!out.includes(t)) out.push(t)
      }
      return out
    })(),
  }

  // ---- glow / blackout ----
  state.glows = [...document.querySelectorAll('.ambient-glow')].map((el) => {
    const s = cs(el)
    return {
      cls: el.className,
      opacity: s.opacity,
      bgImage: s.backgroundImage,
      glowStrength: s.getPropertyValue('--glow-strength').trim(),
      box: box(el),
    }
  })
  const blackout = document.querySelector('.opening-blackout')
  state.blackout = blackout
    ? { active: blackout.getAttribute('data-active'), opacity: cs(blackout).opacity, bg: cs(blackout).backgroundColor, zIndex: cs(blackout).zIndex }
    : null
  const s07veil = document.querySelector('.s07-silence')
  state.s07veil = s07veil ? { bg: cs(s07veil).backgroundColor, opacity: cs(s07veil).opacity, zIndex: cs(s07veil).zIndex } : null

  // ---- S01 chaos ----
  state.chaos = [...document.querySelectorAll('.attention-element')].map((el) => {
    const content = el.querySelector('.attention-element-content')
    const s = cs(content)
    return {
      id: el.getAttribute('data-element'),
      present: el.getAttribute('data-present'),
      secondary: el.getAttribute('data-secondary'),
      fall: el.getAttribute('data-fall'),
      visible: visible(el),
      opacity: s?.opacity ?? null,
      transform: s?.transform ?? null,
      filter: s?.filter ?? null,
      box: box(el),
      text: txt(content),
    }
  })
  const chaosScene = document.querySelector('.chaos-scene')
  state.chaosScene = chaosScene
    ? { active: chaosScene.getAttribute('data-active'), step: chaosScene.getAttribute('data-step'), opacity: cs(chaosScene).opacity, visibility: cs(chaosScene).visibility }
    : null

  // ---- S02 fragmented ----
  const frag = document.querySelector('.fragmented-scene')
  state.fragmented = frag
    ? {
        phase: frag.getAttribute('data-phase'),
        step: frag.getAttribute('data-step'),
        opacity: cs(frag).opacity,
        visibility: cs(frag).visibility,
        services: [...frag.querySelectorAll('.service-icon')].map((el) => ({
          name: el.getAttribute('data-service'),
          present: el.getAttribute('data-present'),
          visible: visible(el),
          opacity: cs(el).opacity,
          box: box(el),
        })),
        statement: (() => {
          const h = frag.querySelector('.information-statement')
          if (!h) return null
          return { text: txt(h), opacity: cs(h).opacity, fontSize: cs(h).fontSize, transform: cs(h).transform, box: box(h) }
        })(),
        metrics: [...frag.querySelectorAll('.fragmented-metric')].map((el) => {
          const num = el.querySelector('.metric-number')
          return {
            label: txt(el.querySelector('.metric-label')),
            number: txt(num),
            numberColor: num ? cs(num).color : null,
            numberFontSize: num ? cs(num).fontSize : null,
            opacity: cs(el).opacity,
            box: box(el),
          }
        }),
        metricsLayerOpacity: frag.querySelector('.fragmented-metrics') ? cs(frag.querySelector('.fragmented-metrics')).opacity : null,
      }
    : null

  // ---- S03 reveal ----
  const rev = document.querySelector('.homeplus-reveal')
  state.reveal = rev
    ? {
        active: rev.getAttribute('data-active'),
        opacity: cs(rev).opacity,
        visibility: cs(rev).visibility,
        transform: cs(rev).transform,
        transitionDelay: cs(rev).transitionDelay,
        logo: (() => { const l = rev.querySelector('.homeplus-logo'); return l ? { box: box(l), src: l.getAttribute('src') } : null })(),
        h1: (() => { const h = rev.querySelector('h1'); return h ? { text: txt(h), fontSize: cs(h).fontSize, color: cs(h).color } : null })(),
      }
    : null

  // ---- phone / app surface ----
  const phone = document.querySelector('.phone-frame')
  const screen = document.querySelector('.phone-frame-screen')
  state.phone = phone
    ? {
        visual: box(phone),
        offset: [phone.offsetWidth, phone.offsetHeight],
        client: [phone.clientWidth, phone.clientHeight],
        transform: cs(phone).transform,
        slot: (() => { const s = phone.closest('.phone-frame-slot'); return s ? { client: [s.clientWidth, s.clientHeight], box: box(s) } : null })(),
      }
    : null
  state.screen = screen ? { client: [screen.clientWidth, screen.clientHeight], scroll: [screen.scrollWidth, screen.scrollHeight] } : null
  state.appSurface = [...document.querySelectorAll('.product-home-layer,.product-planner-layer,.product-family-layer,.s08-screen-stack,.s09-screen-fill')]
    .filter((el) => visible(el))
    .map((el) => ({ cls: el.className, box: box(el), client: [el.clientWidth, el.clientHeight], ariaLabel: el.getAttribute('aria-label') }))

  // ---- S04 home rows ----
  const homeScreen = document.querySelector('.home-demo-screen[aria-label*="Home"]')
  state.home = homeScreen
    ? {
        date: txt(homeScreen.querySelector('.home-current-date')),
        sections: [...homeScreen.querySelectorAll('.home-section-heading')].map((h) => txt(h)),
        rows: [...homeScreen.querySelectorAll('.home-demo-row')].map((row) => {
          const title = row.querySelector('.home-row-title')
          const ts = cs(title)
          const label = row.querySelector('.task-completion-label')
          const mark = row.querySelector('.task-status-mark')
          const copy = row.querySelector('.home-row-copy')
          return {
            id: row.getAttribute('data-home-item'),
            kind: row.getAttribute('data-kind'),
            attention: row.getAttribute('data-attention'),
            completed: row.getAttribute('data-completed'),
            focused: row.getAttribute('data-focused'),
            title: txt(title),
            titleDecoration: ts.textDecorationLine,
            titleColor: ts.color,
            subtitle: txt(row.querySelector('.home-row-subtitle')),
            completionLabel: label ? txt(label) : null,
            markAria: mark ? mark.getAttribute('aria-label') : null,
            copyOpacity: copy ? cs(copy).opacity : null,
            copyTransform: copy ? cs(copy).transform : null,
            bg: cs(row).backgroundColor,
            box: box(row),
            titleFontSize: ts.fontSize,
          }
        }),
        topBarOpacity: (() => { const t = homeScreen.querySelector('.home-top-bar'); return t ? cs(t).opacity : null })(),
        navOpacity: (() => { const t = homeScreen.querySelector('.home-navigation'); return t ? cs(t).opacity : null })(),
      }
    : null

  // ---- S05 planner ----
  const planner = document.querySelector('.planner-demo-screen')
  state.planner = planner
    ? {
        ariaLabel: planner.getAttribute('aria-label'),
        view: planner.getAttribute('data-view'),
        heading: txt(planner.querySelector('.planner-heading h1')),
        headingFontSize: planner.querySelector('.planner-heading h1') ? cs(planner.querySelector('.planner-heading h1')).fontSize : null,
        tabs: [...planner.querySelectorAll('.planner-tab')].map((el) => ({
          label: txt(el),
          selected: el.getAttribute('aria-selected'),
          client: [el.clientWidth, el.clientHeight],
          box: box(el),
          fontSize: cs(el).fontSize,
        })),
        selectionPill: (() => { const s = planner.querySelector('.planner-tab-selection'); return s ? { left: cs(s).left, width: cs(s).width } : null })(),
        panels: [...planner.querySelectorAll('.planner-panel')].map((p) => ({
          id: p.id, present: p.getAttribute('data-present'), opacity: cs(p).opacity, visible: visible(p),
          scroll: [p.scrollWidth, p.scrollHeight],
        })),
        panelStackScroll: (() => { const s = planner.querySelector('.planner-panel-stack'); return s ? { client: [s.clientWidth, s.clientHeight], scroll: [s.scrollWidth, s.scrollHeight] } : null })(),
        sectionLabel: txt(planner.querySelector('.planner-panel[data-present="true"] .planner-section-label')),
        taskRows: [...planner.querySelectorAll('.planner-task-row')].map((r) => ({
          id: r.getAttribute('data-task-id'),
          completed: r.getAttribute('data-completed'),
          title: txt(r.querySelector('.planner-row-title')),
          decoration: cs(r.querySelector('.planner-row-title')).textDecorationLine,
          meta: txt(r.querySelector('.planner-row-meta')),
          metaFontSize: cs(r.querySelector('.planner-row-meta')).fontSize,
          box: box(r),
        })),
        unchecked: planner.querySelectorAll('.planner-unchecked').length,
        eventRow: (() => { const e = planner.querySelector('.planner-event-row'); return e ? { title: txt(e.querySelector('.planner-row-title')), meta: txt(e.querySelector('.planner-row-meta')), label: txt(planner.querySelector('.planner-event-label')), week: txt(planner.querySelector('.planner-week-range p')) } : null })(),
        planHeading: (() => { const h = planner.querySelector('.planner-plan-heading'); return h ? { title: txt(h.querySelector('h2')), meta: txt(h.querySelector('p')) } : null })(),
        planSteps: [...planner.querySelectorAll('.planner-plan-step')].map((s) => txt(s.querySelector('.planner-row-title'))),
        anyTimeText: (() => {
          const found = []
          for (const el of planner.querySelectorAll('*')) {
            if (el.children.length) continue
            const t = txt(el)
            if (t && /\d{1,2}:\d{2}/.test(t)) found.push(t)
          }
          return found
        })(),
      }
    : null

  // ---- S06 family ----
  const fam = document.querySelector('.family-demo-screen')
  state.family = fam
    ? {
        ariaLabel: fam.getAttribute('aria-label'),
        view: fam.getAttribute('data-family-view'),
        heading: txt(fam.querySelector('.family-screen-heading h1')),
        switchItems: [...fam.querySelectorAll('.family-switch > span')].map((s) => ({ text: txt(s), selected: s.getAttribute('data-selected') })),
        switchOpacity: (() => { const s = fam.querySelector('.family-switch'); return s ? cs(s).opacity : null })(),
        members: [...fam.querySelectorAll('.family-member-card')].map((c) => ({
          name: txt(c.querySelector('h2,h3')),
          meta: txt(c.querySelector('p')),
          headingTag: c.querySelector('h2') ? 'h2' : 'h3',
          hasChevron: !!c.querySelector('svg'),
          box: box(c),
          nameFontSize: cs(c.querySelector('h2,h3')).fontSize,
        })),
        familyNow: (() => { const n = fam.querySelector('.family-now'); return n ? { strong: txt(n.querySelector('strong')), p: txt(n.querySelector('p')), visible: visible(n) } : null })(),
        mapSlot: (() => { const s = fam.querySelector('.family-map-slot'); return s ? { box: box(s), client: [s.clientWidth, s.clientHeight] } : null })(),
        feed: (() => {
          const f = fam.querySelector('.feed-demo-screen')
          if (!f) return null
          return {
            visible: visible(f),
            author: txt(f.querySelector('.feed-author strong')),
            meta: txt(f.querySelector('.feed-author p')),
            message: txt(f.querySelector('.feed-message')),
            question: txt(f.querySelector('.feed-question')),
            footer: txt(f.querySelector('.feed-reply span')),
            articleCount: f.querySelectorAll('article').length,
            commentCount: f.querySelectorAll('.feed-comment,[class*=comment]').length,
            box: box(f.querySelector('article')),
          }
        })(),
      }
    : null

  const mapStage = document.querySelector('.family-map-stage')
  state.mapStage = mapStage
    ? {
        present: mapStage.getAttribute('data-present'),
        expanded: mapStage.getAttribute('data-expanded'),
        opacity: cs(mapStage).opacity,
        transform: cs(mapStage).transform,
        client: [mapStage.clientWidth, mapStage.clientHeight],
        scroll: [mapStage.scrollWidth, mapStage.scrollHeight],
        box: box(mapStage),
        surfaceRadius: (() => { const s = mapStage.querySelector('.family-map-surface'); return s ? cs(s).borderRadius : null })(),
        surfaceBg: (() => { const s = mapStage.querySelector('.family-map-surface'); return s ? cs(s).backgroundColor : null })(),
        containerType: (() => { const m = mapStage.querySelector('.map-demo-screen'); return m ? cs(m).containerType : null })(),
        svgPreserve: (() => { const s = mapStage.querySelector('.map-local-geometry'); return s ? s.getAttribute('preserveAspectRatio') : null })(),
        svgBox: (() => { const s = mapStage.querySelector('.map-local-geometry'); return s ? box(s) : null })(),
        places: [...mapStage.querySelectorAll('.map-place,.map-person,.map-delay')].map((p) => {
          const strong = p.querySelector('strong')
          return {
            cls: p.className,
            present: p.getAttribute('data-present'),
            visible: visible(p),
            text: txt(p),
            fontSize: strong ? cs(strong).fontSize : null,
            box: box(p),
            left: cs(p).left,
            top: cs(p).top,
            bg: cs(p).backgroundColor,
            color: cs(p).color,
          }
        }),
        sharing: (() => { const s = mapStage.querySelector('.map-sharing'); return s ? { text: txt(s), fontSize: cs(s).fontSize, opacity: cs(s).opacity, visible: visible(s), box: box(s) } : null })(),
      }
    : null
  const phonePos = document.querySelector('.home-phone-position')
  state.phonePositionOpacity = phonePos ? cs(phonePos).opacity : null
  state.phonePositionBox = phonePos ? box(phonePos) : null

  // ---- S07 ----
  const s07 = document.querySelector('.s07-statement')
  state.s07 = s07
    ? {
        phrase: document.querySelector('.s07-silence')?.getAttribute('data-phrase') ?? null,
        text: txt(s07),
        fontSize: cs(s07).fontSize,
        opacity: cs(s07).opacity,
        box: box(s07),
        lines: [...s07.querySelectorAll('.s07-line')].map((l) => ({ text: txt(l), color: cs(l).color, weight: cs(l).fontWeight, fontSize: cs(l).fontSize })),
        otherVisibleElements: [...document.querySelectorAll('.presentation-canvas *')].filter((el) => {
          if (s07.contains(el) || el.contains(s07)) return false
          if (el.closest('.presentation-dev')) return false
          return visible(el)
        }).length,
      }
    : null

  return state
}

const run = async () => {
  const browser = await chromium.launch({ executablePath: CHROMIUM_EXE, headless: true })
  const ctx = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 1 })
  const page = await ctx.newPage()
  const errors = []
  const warnings = []
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(m.text())
    if (m.type() === 'warning') warnings.push(m.text())
  })
  page.on('pageerror', (e) => errors.push(`uncaught: ${e.message}`))
  page.on('requestfailed', (r) => errors.push(`requestfailed: ${r.method} ${r.url()} — ${r.failure()?.errorText}`))

  await page.goto(URL_BASE, { waitUntil: 'networkidle' })
  await page.waitForSelector('.presentation-canvas')
  await page.waitForTimeout(900)

  const results = []
  let index = 0
  for (const st of STATES) {
    while (index < slideIndex[st.sid] + (st.step > 0 ? 1 : 0) || (index < (slideIndex[st.sid] + st.step))) {
      break
    }
    // advance deterministically: press ArrowRight until data-slide-index/data-step-index match
    for (let guard = 0; guard < 8; guard += 1) {
      const cur = await page.evaluate(() => {
        const el = document.querySelector('.presentation-scene')
        return {
          slide: Number(document.documentElement.getAttribute('data-slide-index') ?? el?.getAttribute('data-slide-index') ?? -1),
          step: Number(document.documentElement.getAttribute('data-step-index') ?? el?.getAttribute('data-step-index') ?? -1),
        }
      })
      if (cur.slide === slideIndex[st.sid] && cur.step === st.step) break
      await page.keyboard.press('ArrowRight')
      await page.waitForTimeout(160)
    }
    await page.waitForFunction(() => document.getAnimations().every((a) => a.playState === 'finished' || a.playState === 'idle'), null, { timeout: 4000 }).catch(() => {})
    await page.waitForTimeout(120)
    const state = await page.evaluate(probe)
    state.name = st.name
    state.slide = st.sid
    state.step = st.step
    results.push(state)
    await page.screenshot({ path: path.join(OUT_DIR, 'states', `${st.name}.png`), animations: 'disabled', caret: 'hide' })
    process.stdout.write(`captured ${st.name}\n`)
  }

  fs.writeFileSync(path.join(OUT_DIR, 'data', 'states-ab.json'), JSON.stringify({ pwVersion: PW_VERSION, viewport: [W, H], errors, warnings, states: results }, null, 2))
  console.log(`STATES=${results.length} ERRORS=${errors.length} WARNINGS=${warnings.length}`)
  if (errors.length) console.log('ERROR_LIST=' + JSON.stringify(errors.slice(0, 8), null, 2))
  await browser.close()
}

run().catch((e) => { console.error('FATAL', e); process.exit(1) })