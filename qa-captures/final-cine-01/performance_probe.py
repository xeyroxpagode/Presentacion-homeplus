import json
from pathlib import Path
from playwright.sync_api import sync_playwright

OUT = Path(__file__).resolve().parent / "performance.json"
BASE = "http://127.0.0.1:5199/"
data = {}

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    for profile in ("safe", "balanced", "cinematic"):
        page = browser.new_page(viewport={"width": 1280, "height": 720})
        page.goto(f"{BASE}?finalKitchen=1&finalBeat=W08&finalQuality={profile}", wait_until="domcontentloaded")
        page.wait_for_function("() => Boolean(window.__finalPost && window.__finalFrame)", timeout=20000)
        page.wait_for_timeout(5000)
        data[profile] = page.evaluate("() => ({...window.__finalPost, renderer: navigator.userAgent})")
        page.close()
    browser.close()

OUT.write_text(json.dumps(data, indent=2), encoding="utf-8")
print(json.dumps(data, indent=2), flush=True)
