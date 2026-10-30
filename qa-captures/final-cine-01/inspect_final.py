from pathlib import Path
from playwright.sync_api import sync_playwright

OUT = Path(__file__).resolve().parent / "inspect"
OUT.mkdir(parents=True, exist_ok=True)
BASE = "http://127.0.0.1:5199/"


def wait_beat(page, beat, stable=True):
    page.wait_for_function(
        """([beat, stable]) => {
          const frame = window.__finalFrame;
          return frame && frame.qa.beat === beat && (!stable || frame.phase === 'stable');
        }""",
        arg=[beat, stable],
        timeout=20000,
    )


def jump_and_capture(page, beat, name):
    page.evaluate("(beat) => window.__finalQA.goJump(beat)", beat)
    wait_beat(page, beat)
    page.wait_for_timeout(160)
    page.screenshot(path=str(OUT / f"{name}.png"), animations="allow")
    frame = page.evaluate("() => window.__finalFrame")
    print(name, {"beat": frame["qa"]["beat"], "phase": frame["phase"], "t": round(frame["qa"]["localTime"]), "pose": frame["techPose"]}, flush=True)


with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    context = browser.new_context(viewport={"width": 1280, "height": 720}, device_scale_factor=1)
    page = context.new_page()
    errors = []
    page.on("console", lambda message: errors.append(message.text) if message.type == "error" else None)
    page.on("pageerror", lambda error: errors.append(str(error)))

    page.goto(f"{BASE}?finalKitchen=1&finalQuality=cinematic", wait_until="domcontentloaded")
    page.wait_for_function("() => Boolean(window.__finalQA && window.__finalFrame)", timeout=20000)
    for beat in ["W02", "W04", "W05", "W07", "W08"]:
        jump_and_capture(page, beat, beat.lower())

    page.evaluate("(beat) => window.__finalQA.goJump(beat)", "W06")
    wait_beat(page, "W06")
    for pose in ["P0", "P1", "P2"]:
        page.evaluate(
            """(pose) => {
              const url = new URL(location.href);
              url.searchParams.set('finalPose', pose);
              history.replaceState(null, '', url);
            }""",
            pose,
        )
        page.wait_for_timeout(120)
        page.screenshot(path=str(OUT / f"w06-{pose.lower()}.png"), animations="allow")
        print("w06", pose, flush=True)
    page.evaluate(
        """() => {
          const url = new URL(location.href);
          url.searchParams.delete('finalPose');
          history.replaceState(null, '', url);
        }"""
    )
    jump_and_capture(page, "W09", "w09-end")

    page.goto(f"{BASE}?dev=1&slide=18&step=0", wait_until="domcontentloaded")
    page.wait_for_selector(".s18-closing")
    page.wait_for_timeout(750)
    page.screenshot(path=str(OUT / "s18-1280.png"), animations="allow")
    page.set_viewport_size({"width": 390, "height": 844})
    page.wait_for_timeout(120)
    page.screenshot(path=str(OUT / "s18-390.png"), animations="allow")

    print("ERRORS", errors, flush=True)
    browser.close()
