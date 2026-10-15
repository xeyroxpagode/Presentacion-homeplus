// Session 7 — in-page probe (motion / stagecraft oriented).
// Self-contained function string, injected per page. READ-ONLY.

export const PROBE = /* js */ `() => {
  const CANVAS = document.querySelector('.presentation-canvas');
  const SCENE  = document.querySelector('.presentation-scene');
  const PHONE  = document.querySelector('.phone-frame');
  const SCREEN = document.querySelector('.phone-frame-screen');
  const SLOT   = document.querySelector('.phone-frame-slot');
  const APP    = SCREEN ? SCREEN.firstElementChild : null;

  const num = (v) => { const n = parseFloat(v); return Number.isFinite(n) ? n : 0; };
  const r2  = (n) => Math.round(n * 100) / 100;

  function box(el) {
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { x: r2(r.x), y: r2(r.y), w: r2(r.width), h: r2(r.height) };
  }
  function metrics(el) {
    if (!el) return null;
    const cs = getComputedStyle(el);
    return {
      clientW: el.clientWidth, clientH: el.clientHeight,
      scrollW: el.scrollWidth, scrollH: el.scrollHeight,
      scrollTop: el.scrollTop, scrollLeft: el.scrollLeft,
      opacity: r2(num(cs.opacity)),
      transform: cs.transform,
      transition: cs.transition,
      animation: cs.animation,
      visibility: cs.visibility,
      display: cs.display
    };
  }

  // ANCESTOR-AWARE visibility: an element is painted only if it AND every
  // ancestor is display!=none, visibility!=hidden and cumulative opacity > 0.
  function visible(el) {
    let node = el
    let acc = 1
    while (node && node.nodeType === 1) {
      const cs = getComputedStyle(node)
      if (cs.display === 'none') return false
      if (cs.visibility === 'hidden' || cs.visibility === 'collapse') return false
      acc *= num(cs.opacity)
      if (acc <= 0.004) return false
      node = node.parentElement
    }
    const r = el.getBoundingClientRect()
    if (r.width <= 0.5 || r.height <= 0.5) return false
    // clipped away by an ancestor with overflow hidden and zero-size box
    return true
  }

  function insidePhone(el) {
    return PHONE ? PHONE.contains(el) : false;
  }

  // ---- per-element census ------------------------------------------------
  const all = Array.from(document.querySelectorAll('#root *'));
  const vis = [];
  const canvasBox = CANVAS ? CANVAS.getBoundingClientRect() : null;

  for (const el of all) {
    if (!visible(el)) continue;
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    const area = r.width * r.height;
    const text = (el.textContent || '').trim();
    const ownText = Array.from(el.childNodes)
      .filter((n) => n.nodeType === 3)
      .map((n) => n.textContent.trim())
      .join(' ')
      .trim();
    const fs = num(cs.fontSize);
    let effOp = 1, anc = el.parentElement;
    while (anc && anc.nodeType === 1) { effOp *= num(getComputedStyle(anc).opacity); anc = anc.parentElement; }
    const op = r2(effOp);
    const clipped = canvasBox
      ? (r.right > canvasBox.right + 0.5 || r.bottom > canvasBox.bottom + 0.5 ||
         r.left < canvasBox.left - 0.5 || r.top < canvasBox.top - 0.5)
      : false;
    const ovfX = el.scrollWidth - el.clientWidth;
    const ovfY = el.scrollHeight - el.clientHeight;

    vis.push({
      node: el,
      tag: el.tagName.toLowerCase(),
      cls: (el.className && typeof el.className === 'string')
        ? el.className.trim().split(/\\s+/).slice(0, 3).join('.')
        : '',
      x: r2(r.x), y: r2(r.y), w: r2(r.width), h: r2(r.height),
      area: r2(area),
      fontSize: fs,
      opacity: r2(op),
      transform: cs.transform,
      bg: cs.backgroundColor,
      color: cs.color,
      text: ownText.slice(0, 120),
      allTextLen: text.length,
      inPhone: insidePhone(el),
      clipped: clipped,
      ovfX, ovfY,
      // salience: size of type dominates attention on a projector
      sal: r2(fs * fs * op * Math.min(area, 400000) / 10000 * (insidePhone(el) ? 0.55 : 1))
    });
  }

  // ---- attention ranking --------------------------------------------------
  const textNodes = vis
    .filter((v) => v.text.length > 0 && v.fontSize >= 10)
    .sort((a, b) => b.sal - a.sal);

  const stageType = textNodes.filter((v) => !v.inPhone).slice(0, 8);
  const appType   = textNodes.filter((v) =>  v.inPhone).slice(0, 8);

  // ---- decorative / glow layer -------------------------------------------
  const glows = vis.filter((v) => /glow|light|halo/i.test(v.cls)).map((v) => ({
    cls: v.cls, opacity: v.opacity, w: v.w, h: v.h, x: v.x, y: v.y, clipped: v.clipped
  }));

  // ---- exposure buckets (ancestor-aware effective opacity) --------------
  const eff = (el) => {
    let acc = 1, node = el
    while (node && node.nodeType === 1) { acc *= num(getComputedStyle(node).opacity); node = node.parentElement }
    return r2(acc)
  }
  const withEff = vis.map((v) => ({ ...v, eff: eff(v.node) }))
  const full = withEff.filter((v) => v.eff >= 0.92).length;
  const mid  = withEff.filter((v) => v.eff >= 0.4 && v.eff < 0.92).length;
  const low  = withEff.filter((v) => v.eff > 0.004 && v.eff < 0.4).length;

  // ---- animation census (playState classified — see N-10) -----------------
  const anims = [];
  try {
    for (const a of document.getAnimations()) {
      const tgt = a.effect && a.effect.target;
      const cs = tgt ? getComputedStyle(tgt) : null;
      const timing = a.effect && a.effect.getTiming ? a.effect.getTiming() : null;
      anims.push({
        playState: a.playState,
        target: tgt ? (tgt.tagName.toLowerCase() + '.' +
                (typeof tgt.className === 'string' ? tgt.className.trim().split(/\\s+/).slice(0,2).join('.') : '')) : 'null',
        inPhone: tgt ? insidePhone(tgt) : false,
        duration: timing ? timing.duration : null,
        delay: timing ? timing.delay : null,
        easing: timing && timing.easing ? timing.easing : null,
        iterations: timing ? timing.iterations : null,
        transitionProperty: cs ? cs.transitionProperty : null,
        transitionDuration: cs ? cs.transitionDuration : null,
        transitionTiming: cs ? cs.transitionTimingFunction : null
      });
    }
  } catch (e) { /* getAnimations unavailable */ }

  const running = anims.filter((a) => a.playState === 'running');
  const finished = anims.filter((a) => a.playState === 'finished');

  // ---- devices -----------------------------------------------------------
  const slots = Array.from(document.querySelectorAll('.phone-frame-slot')).filter(visible);
  const devices = slots.map((s) => {
    const f = s.querySelector('.phone-frame');
    const sc = s.querySelector('.phone-frame-screen');
    const m = f ? metrics(f) : null;
    return {
      slotBox: box(s),
      slotClient: [s.clientWidth, s.clientHeight],
      frameBox: box(f),
      frameTransform: m ? m.transform : null,
      scale: m && m.transform && m.transform.startsWith('matrix')
        ? r2(parseFloat(m.transform.slice(7).split(',')[0])) : null,
      screenClient: sc ? [sc.clientWidth, sc.clientHeight] : null,
      screenScroll: sc ? [sc.scrollWidth, sc.scrollHeight] : null,
      appClient: sc && sc.firstElementChild
        ? [sc.firstElementChild.clientWidth, sc.firstElementChild.clientHeight] : null,
      appScroll: sc && sc.firstElementChild
        ? [sc.firstElementChild.scrollWidth, sc.firstElementChild.scrollHeight] : null
    };
  });

  // ---- max transform scale among visible elements ------------------------
  let maxScale = 1, maxScaleCls = '';
  for (const el of all) {
    if (!visible(el)) continue;
    const t = getComputedStyle(el).transform;
    if (t && t.startsWith('matrix')) {
      const s = parseFloat(t.slice(7).split(',')[0]);
      if (Number.isFinite(s) && s > maxScale) {
        maxScale = s;
        maxScaleCls = el.tagName.toLowerCase() + '.' +
          (typeof el.className === 'string' ? el.className.trim().split(/\\s+/).slice(0,2).join('.') : '');
      }
    }
  }

  const de = document.documentElement;

  return {
    slideIndex: SCENE ? Number(SCENE.getAttribute('data-slide-index')) : null,
    stepIndex:  SCENE ? Number(SCENE.getAttribute('data-step-index'))  : null,
    slideName:  SCENE ? SCENE.getAttribute('aria-label') : null,
    canvas: metrics(CANVAS),
    canvasBox: box(CANVAS),
    scene: metrics(SCENE),
    slot: metrics(SLOT),
    phone: metrics(PHONE),
    screen: metrics(SCREEN),
    app: metrics(APP),
    docScroll: [de.scrollTop, de.scrollLeft, de.scrollWidth, de.scrollHeight],
    devices,
    deviceCount: devices.length,
    maxScale: r2(maxScale), maxScaleCls,
    counts: { visible: vis.length, full, mid, low,
              dom: document.querySelectorAll('#root *').length },
    glows,
    stageType, appType,
    animations: { total: anims.length, running: running.length, finished: finished.length,
                  runningList: running.slice(0, 24), all: anims.slice(0, 40) },
    overflow: vis.filter((v) => v.ovfX > 0 || v.ovfY > 0)
      .map((v) => ({ cls: v.cls, ovfX: v.ovfX, ovfY: v.ovfY, inPhone: v.inPhone }))
      .slice(0, 30),
    clipped: vis.filter((v) => v.clipped).map((v) => ({ cls: v.cls, x: v.x, y: v.y, w: v.w, h: v.h }))
  };
}`

// Compact fingerprint used for forward/back comparison.
export const FINGERPRINT = /* js */ `() => {
  const els = Array.from(document.querySelectorAll('.presentation-canvas *'));
  const parts = [];
  for (const el of els) {
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    parts.push([
      el.tagName,
      typeof el.className === 'string' ? el.className : '',
      Math.round(r.x*100)/100, Math.round(r.y*100)/100,
      Math.round(r.width*100)/100, Math.round(r.height*100)/100,
      cs.opacity, cs.transform, cs.fontSize, cs.visibility,
      el.clientWidth, el.clientHeight, el.scrollWidth, el.scrollHeight, el.scrollTop
    ].join('|'));
  }
  const de = document.documentElement;
  return {
    n: parts.length,
    hash: parts.join('#'),
    text: Array.from(new Set(Array.from(document.querySelectorAll('.presentation-canvas *'))
      .filter((e) => e.children.length === 0)
      .map((e) => (e.textContent||'').trim()).filter((s) => s.length))).join('¦'),
    doc: [de.scrollTop, de.scrollLeft].join(','),
    anims: document.getAnimations().map((a) => a.playState + ':' +
      (a.effect && a.effect.target ? (a.effect.target.tagName + '.' +
        (typeof a.effect.target.className === 'string' ? a.effect.target.className : '')) : 'null')).join(';')
  };
}`

export const FNV = /* js */ `(s) => {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h.toString(16).padStart(8, '0');
}`