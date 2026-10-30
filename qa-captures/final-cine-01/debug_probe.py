import time
from playwright.sync_api import sync_playwright

URL = "http://127.0.0.1:5199/?finalKitchen=1&finalBeat=W04&finalQuality=cinematic"

def mark(label, started):
    print(label, round(time.perf_counter() - started, 2), flush=True)

started = time.perf_counter()
with sync_playwright() as p:
    mark("playwright", started)
    browser = p.chromium.launch(headless=True)
    mark("browser", started)
    page = browser.new_page(viewport={"width": 1280, "height": 720})
    page.on("console", lambda message: print("console", message.type, message.text, flush=True))
    page.on("pageerror", lambda error: print("pageerror", str(error), flush=True))
    page.goto(URL, wait_until="domcontentloaded", timeout=20000)
    mark("domcontentloaded", started)
    page.wait_for_selector(".final-kitchen-stage", timeout=20000)
    mark("stage", started)
    page.wait_for_function("() => Boolean(window.__finalFrame)", timeout=20000)
    mark("frame", started)
    print(page.evaluate("() => ({beat: window.__finalFrame.qa.beat, phase: window.__finalFrame.phase})"), flush=True)
    page.screenshot(path="qa-captures/final-cine-01/debug-probe.png")
    mark("screenshot", started)
    browser.close()
