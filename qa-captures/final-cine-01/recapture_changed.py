from pathlib import Path
from playwright.sync_api import sync_playwright

OUT = Path(__file__).resolve().parent / "final"
BASE = "http://127.0.0.1:5199/"

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    errors = []
    for width, height in ((1280, 720), (1920, 1080)):
        page = browser.new_page(viewport={"width": width, "height": height})
        page.on("console", lambda m: errors.append(m.text) if m.type == "error" else None)
        page.on("pageerror", lambda e: errors.append(str(e)))
        page.goto(f"{BASE}?finalKitchen=1&finalQuality=safe&finalBeat=W05", wait_until="domcontentloaded")
        page.wait_for_function("() => Boolean(window.__finalQA && window.__finalFrame)", timeout=20000)
        page.wait_for_timeout(3500)
        page.screenshot(path=str(OUT / f"w05-invoice-{width}.png"))
        page.evaluate("() => window.__finalQA.goJump('W06')")
        page.wait_for_function("() => window.__finalFrame?.qa?.beat === 'W06'", timeout=10000)
        for pose in ("P0", "P1", "P2"):
            page.evaluate("pose => { const u=new URL(location.href); u.searchParams.set('finalPose', pose); history.replaceState(null,'',u); }", pose)
            page.wait_for_timeout(220)
            page.screenshot(path=str(OUT / f"w06-{pose.lower()}-{width}.png"))
        page.close()

        credits = browser.new_page(viewport={"width": width, "height": height})
        credits.goto(f"{BASE}?dev=1&slide=18&step=0", wait_until="domcontentloaded")
        credits.wait_for_selector(".s18-closing")
        credits.wait_for_timeout(700)
        credits.locator(".presentation-dev").evaluate("el => { el.style.display='none'; }")
        credits.screenshot(path=str(OUT / f"s18-credits-{width}.png"))
        credits.close()
    print("ERRORS", errors, flush=True)
    browser.close()
