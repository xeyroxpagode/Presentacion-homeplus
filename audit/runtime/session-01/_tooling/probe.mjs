// Injected probe. Must be self-contained (serialized by Playwright).
export function probe() {
  const r2 = (n) => Math.round(n * 100) / 100
  const clsOf = (el) => {
    const c = el.className
    if (!c) return ''
    if (typeof c === 'string') return c
    if (c.baseVal !== undefined) return c.baseVal
    return ''
  }
  const pathOf = (el) => {
    const parts = []
    let n = el
    while (n && n.nodeType === 1 && parts.length < 40) {
      const p = n.parentElement
      if (!p) {
        parts.unshift(n.tagName.toLowerCase())
        break
      }
      const sibs = Array.from(p.children).filter((c) => c.tagName === n.tagName)
      parts.unshift(`${n.tagName.toLowerCase()}:${sibs.indexOf(n)}`)
      n = p
    }
    return parts.join('/')
  }
  const keyOf = (el) => {
    const t = (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 40)
    return `${el.tagName.toLowerCase()}.${clsOf(el).trim().split(/\s+/).slice(0, 3).join('.')}|${t}`
  }
  const box = (el) => {
    const r = el.getBoundingClientRect()
    return {
      x: r2(r.x),
      y: r2(r.y),
      w: r2(r.width),
      h: r2(r.height),
      right: r2(r.right),
      bottom: r2(r.bottom),
    }
  }
  const visible = (el, cs) => {
    if (cs.display === 'none' || cs.visibility === 'hidden') return false
    if (Number(cs.opacity) === 0) return false
    const r = el.getBoundingClientRect()
    return r.width > 0 && r.height > 0
  }

  const scene = document.querySelector('.presentation-scene')
  const canvas = document.querySelector('.presentation-canvas')
  const viewport = document.querySelector('.presentation-viewport')
  const docEl = document.documentElement
  const body = document.body

  const canvasBox = canvas ? box(canvas) : null
  const canvasCS = canvas ? getComputedStyle(canvas) : null

  const inv = []
  const hidden = []
  const scrollables = []
  const clipped = []
  const all = Array.from(document.querySelectorAll('#root *'))

  for (const el of all) {
    const cs = getComputedStyle(el)
    const b = box(el)
    const rec = {
      key: keyOf(el),
      path: pathOf(el),
      cls: clsOf(el).slice(0, 120),
      tag: el.tagName.toLowerCase(),
      box: b,
      layoutW: el.offsetWidth,
      layoutH: el.offsetHeight,
      clientW: el.clientWidth,
      clientH: el.clientHeight,
      scrollW: el.scrollWidth,
      scrollH: el.scrollHeight,
      scrollTop: el.scrollTop,
      scrollLeft: el.scrollLeft,
      opacity: cs.opacity,
      transform: cs.transform,
      translate: cs.translate,
      scale: cs.scale,
      fontSize: cs.fontSize,
      overflow: cs.overflow,
      overflowY: cs.overflowY,
      position: cs.position,
      zIndex: cs.zIndex,
      display: cs.display,
      visibility: cs.visibility,
      clipPath: cs.clipPath,
      parentKey: el.parentElement ? keyOf(el.parentElement) : null,
      text: el.children.length === 0 ? (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 80) : '',
    }
    const isVis = visible(el, cs)
    rec.visible = isVis
    inv.push(rec)

    if (!isVis && b.w > 0 && b.h > 0 && cs.display !== 'none') {
      hidden.push({ key: rec.key, cls: rec.cls, opacity: rec.opacity, visibility: rec.visibility, box: b })
    }
    if (el.scrollHeight - el.clientHeight > 1 || el.scrollWidth - el.clientWidth > 1) {
      scrollables.push({
        key: rec.key,
        cls: rec.cls.slice(0, 80),
        clientW: rec.clientW,
        clientH: rec.clientH,
        scrollW: rec.scrollW,
        scrollH: rec.scrollH,
        overflowY: rec.overflowY,
        overflowX: cs.overflowX,
        overflowYActual: rec.scrollH - rec.clientH,
        overflowXActual: rec.scrollW - rec.clientW,
      })
    }
    if (
      canvasBox &&
      b.w > 0 &&
      b.h > 0 &&
      (b.x < canvasBox.x - 1 || b.y < canvasBox.y - 1 || b.right > canvasBox.right + 1 || b.bottom > canvasBox.bottom + 1)
    ) {
      clipped.push({ key: rec.key, cls: rec.cls.slice(0, 80), box: b, visible: isVis })
    }
  }

  const visInv = inv.filter((e) => e.visible)
  const texts = []
  const seen = new Set()
  for (const e of visInv) {
    if (e.text && !seen.has(e.text)) {
      seen.add(e.text)
      texts.push(e.text)
    }
  }

  // phone / app surface detection
  const phoneSlot = document.querySelector('.phone-frame-slot')
  const phoneFrame = document.querySelector('.phone-frame')
  const phoneScreen = document.querySelector('.phone-frame-screen')
  const screenChild = phoneScreen && phoneScreen.firstElementChild

  const pick = (el) => {
    if (!el) return null
    const cs = getComputedStyle(el)
    const b = box(el)
    return {
      cls: clsOf(el).slice(0, 120),
      box: b,
      layoutW: el.offsetWidth,
      layoutH: el.offsetHeight,
      clientW: el.clientWidth,
      clientH: el.clientHeight,
      scrollW: el.scrollWidth,
      scrollH: el.scrollHeight,
      scrollTop: el.scrollTop,
      transform: cs.transform,
      transformOrigin: cs.transformOrigin,
      fontSize: cs.fontSize,
      opacity: cs.opacity,
      overflow: cs.overflow,
      parentKey: el.parentElement ? keyOf(el.parentElement) : null,
      siblings: el.parentElement
        ? Array.from(el.parentElement.children)
            .filter((c) => c !== el)
            .map((c) => ({ key: keyOf(c), box: box(c), visible: visible(c, getComputedStyle(c)) }))
        : [],
    }
  }

  // element with the largest non-stage transform scale (candidate "zoom target")
  let zoomTarget = null
  let maxScale = 1
  for (const e of visInv) {
    if (!e.transform || e.transform === 'none') continue
    const m = e.transform.match(/^matrix\(([-\d.e]+),\s*([-\d.e]+),\s*([-\d.e]+),\s*([-\d.e]+)/)
    if (!m) continue
    const sx = Math.hypot(Number(m[1]), Number(m[2]))
    if (sx > maxScale + 0.01) {
      maxScale = sx
      zoomTarget = { key: e.key, cls: e.cls, box: e.box, scale: Math.round(sx * 1000) / 1000, transform: e.transform, fontSize: e.fontSize, parentKey: e.parentKey }
    }
  }

  // scaled-up typography relative to its own token baseline
  const largeFonts = visInv
    .filter((e) => parseFloat(e.fontSize) >= 24 && e.tag !== 'div' && e.tag !== 'section')
    .map((e) => ({ key: e.key, fontSize: e.fontSize, box: e.box, text: e.text }))
    .slice(0, 40)

  const moduleGuess = visInv.find((e) => /demo-screen|map-stage|home-scene|planner|family|finance|assets|homecloud|homi|inventory/i.test(e.cls))

  return {
    slideId: scene ? scene.dataset.slideId : null,
    slideIndex: scene ? scene.dataset.slideIndex : null,
    stepIndex: scene ? scene.dataset.stepIndex : null,
    slideAria: scene ? scene.getAttribute('aria-label') : null,
    browser: {
      docScrollW: docEl.scrollWidth,
      docClientW: docEl.clientWidth,
      docScrollH: docEl.scrollHeight,
      docClientH: docEl.clientHeight,
      docScrollTop: docEl.scrollTop,
      docScrollLeft: docEl.scrollLeft,
      bodyScrollW: body.scrollWidth,
      bodyClientW: body.clientWidth,
      bodyScrollH: body.scrollHeight,
      bodyClientH: body.clientHeight,
      bodyOverflow: getComputedStyle(body).overflow,
      innerW: window.innerWidth,
      innerH: window.innerHeight,
    },
    viewport: viewport ? { ...box(viewport), clientW: viewport.clientWidth, clientH: viewport.clientHeight, scrollW: viewport.scrollWidth, scrollH: viewport.scrollHeight } : null,
    canvas: canvasBox
      ? {
          ...canvasBox,
          clientW: canvas.clientWidth,
          clientH: canvas.clientHeight,
          scrollW: canvas.scrollWidth,
          scrollH: canvas.scrollHeight,
          transform: canvasCS.transform,
          transformOrigin: canvasCS.transformOrigin,
          overflow: canvasCS.overflow,
          offsetW: canvas.offsetWidth,
          offsetH: canvas.offsetHeight,
        }
      : null,
    phone: { slot: pick(phoneSlot), frame: pick(phoneFrame), screen: pick(phoneScreen), appSurface: pick(screenChild) },
    phonePresent: !!phoneFrame,
    zoomTarget,
    maxScale: Math.round(maxScale * 1000) / 1000,
    moduleGuess: moduleGuess ? { key: moduleGuess.key, cls: moduleGuess.cls, box: moduleGuess.box } : null,
    texts,
    largeFonts,
    scrollables,
    clippedVisible: clipped.filter((c) => c.visible),
    clippedAll: clipped.length,
    hiddenLayers: hidden.filter((h) => h.cls).slice(0, 60),
    hiddenCount: hidden.length,
    inventoryCount: inv.length,
    inventory: inv,
  }
}