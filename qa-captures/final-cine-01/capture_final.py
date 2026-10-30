from pathlib import Path

from playwright.sync_api import sync_playwright


OUT = Path(__file__).resolve().parent / "final"
OUT.mkdir(parents=True, exist_ok=True)
BASE = "http://127.0.0.1:5199/"


def capture(page, label, width):
    page.wait_for_timeout(180)
    page.screenshot(path=str(OUT / f"{label}-{width}.png"), animations="allow")


with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    errors = []
    for width, height in ((1280, 720), (1920, 1080)):
        page = browser.new_page(viewport={"width": width, "height": height})
        page.on("console", lambda message: errors.append(message.text) if message.type == "error" else None)
        page.on("pageerror", lambda error: errors.append(str(error)))
        page.goto(f"{BASE}?finalKitchen=1&finalQuality=safe", wait_until="domcontentloaded")
        page.wait_for_function("() => Boolean(window.__finalQA && window.__finalFrame && window.__finalScene)", timeout=20000)
        page.wait_for_timeout(3500)
        page.evaluate(
            """() => {
              const director = window.__finalDirector;
              window.__captureOriginalEvaluate = director.evaluateFinalFrame.bind(director);
              director.evaluateFinalFrame = (beat, t, ...rest) => {
                const forced = window.__captureForced;
                return window.__captureOriginalEvaluate(beat, forced?.beat === beat ? forced.time : t, ...rest);
              };
            }"""
        )

        def beat(name, label=None, forced_time=None, pose=None):
            page.evaluate("([beat, time]) => { window.__captureForced = time === null ? null : {beat, time}; window.__finalQA.goJump(beat); }", [name, forced_time])
            page.wait_for_function("beat => window.__finalFrame?.qa?.beat === beat", arg=name, timeout=10000)
            if pose:
                page.evaluate("pose => { const u=new URL(location.href); u.searchParams.set('finalPose', pose); history.replaceState(null,'',u); }", pose)
            else:
                page.evaluate("() => { const u=new URL(location.href); u.searchParams.delete('finalPose'); history.replaceState(null,'',u); }")
            capture(page, label or name.lower(), width)

        beat("W01", "w01-exit", 975)
        beat("W02", "w02-wide")
        beat("W04", "w04-backpack")
        beat("W05", "w05-invoice")
        beat("W06", "w06-p0", pose="P0")
        beat("W06", "w06-p1", pose="P1")
        beat("W06", "w06-p2", pose="P2")
        beat("W07", "w07-wide")
        beat("W08", "w08-hold")
        beat("W09", "w09-000", 0)
        beat("W09", "w09-050", 375)
        beat("W09", "w09-100", 750)
        page.close()

        credits = browser.new_page(viewport={"width": width, "height": height})
        credits.on("console", lambda message: errors.append(message.text) if message.type == "error" else None)
        credits.on("pageerror", lambda error: errors.append(str(error)))
        credits.goto(f"{BASE}?dev=1&slide=18&step=0", wait_until="domcontentloaded")
        credits.wait_for_selector(".s18-closing")
        credits.wait_for_timeout(700)
        credits.locator(".presentation-dev").evaluate("el => { el.style.display = 'none'; }")
        credits.screenshot(path=str(OUT / f"s18-credits-{width}.png"), animations="allow")
        credits.close()

    print("CAPTURES", len(list(OUT.glob("*.png"))), "ERRORS", errors, flush=True)
    browser.close()
