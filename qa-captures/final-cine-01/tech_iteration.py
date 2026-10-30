from pathlib import Path
from playwright.sync_api import sync_playwright

OUT = Path(__file__).resolve().parent / "iteration"
OUT.mkdir(parents=True, exist_ok=True)
URL = "http://127.0.0.1:5199/?finalKitchen=1&finalQuality=safe"

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1280, "height": 720})
    errors = []
    page.on("pageerror", lambda error: errors.append(str(error)))
    page.goto(URL, wait_until="domcontentloaded")
    page.wait_for_function("() => Boolean(window.__finalQA && window.__finalFrame)", timeout=20000)
    for beat in ["W02", "W05", "W06"]:
        page.evaluate("(beat) => window.__finalQA.goJump(beat)", beat)
        page.wait_for_function(
            "beat => window.__finalFrame?.qa.beat === beat && window.__finalFrame?.phase === 'stable'",
            arg=beat,
            timeout=20000,
        )
        page.wait_for_timeout(120)
        page.screenshot(path=str(OUT / f"{beat.lower()}.png"))
    print("ERRORS", errors, flush=True)
    browser.close()
