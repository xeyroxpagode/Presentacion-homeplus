from pathlib import Path
from playwright.sync_api import sync_playwright

OUT = Path(__file__).resolve().parent / "invoice-probe"
OUT.mkdir(parents=True, exist_ok=True)
CANDIDATES = {
    "a-right": ([0.75, 1.28, 0.15], [-0.17, 0.98, -0.44]),
    "b-right-low": ([0.65, 1.14, 0.0], [-0.17, 0.98, -0.44]),
    "c-front-tight": ([-0.35, 1.22, 0.42], [-0.17, 0.98, -0.44]),
    "d-left-crop": ([-1.3, 1.18, -0.05], [-0.17, 0.98, -0.44]),
}

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1280, "height": 720})
    page.goto("http://127.0.0.1:5199/?finalKitchen=1&finalQuality=safe&finalBeat=W05", wait_until="domcontentloaded")
    page.wait_for_function("() => Boolean(window.__finalDirector && window.__finalFrame)", timeout=20000)
    page.wait_for_timeout(3000)
    page.evaluate("""() => { const d=window.__finalDirector; window.__invoiceOriginal=d.evaluateFinalFrame.bind(d); d.evaluateFinalFrame=(...args)=>{const f=window.__invoiceOriginal(...args); const q=window.__invoiceProbe; return q?{...f,camPos:q.pos,camTarget:q.target}:f}; }""")
    for name, (position, target) in CANDIDATES.items():
        page.evaluate("q => { window.__invoiceProbe=q; window.__finalQA.goJump('W05'); }", {"pos": position, "target": target})
        page.wait_for_timeout(250)
        page.screenshot(path=str(OUT / f"{name}.png"))
    browser.close()
