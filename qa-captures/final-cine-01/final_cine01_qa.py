import json
import time
from pathlib import Path

from playwright.sync_api import sync_playwright


ROOT = Path(__file__).resolve().parent
OUT = ROOT / "qa-results.json"
BASE = "http://127.0.0.1:5199/"
results = []


def record(name, passed, detail=None):
    results.append({"name": name, "pass": bool(passed), "detail": detail})
    print(("PASS" if passed else "FAIL"), name, detail or "", flush=True)


def state(page):
    return page.locator(".presentation-scene").evaluate(
        "el => ({slide: Number(el.dataset.slideIndex), step: Number(el.dataset.stepIndex), id: el.dataset.slideId})"
    )


def wait_state(page, slide, step=None, timeout=15000):
    page.wait_for_function(
        "([slide, step]) => { const el = document.querySelector('.presentation-scene'); return el && Number(el.dataset.slideIndex) === slide && (step === null || Number(el.dataset.stepIndex) === step); }",
        arg=[slide, step],
        timeout=timeout,
    )


def timed_press(page, key, slide, step=None):
    started = time.perf_counter()
    page.keyboard.press(key)
    wait_state(page, slide, step)
    return round((time.perf_counter() - started) * 1000, 1)


with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    context = browser.new_context(viewport={"width": 1280, "height": 720})
    page = context.new_page()
    errors = []
    page.on("console", lambda message: errors.append(message.text) if message.type == "error" else None)
    page.on("pageerror", lambda error: errors.append(str(error)))

    # Entrada real desde S17: permite probar el travelling y no un snapshot de desarrollo.
    page.goto(f"{BASE}?dev=1&slide=16&step=7&finalQuality=safe", wait_until="domcontentloaded")
    wait_state(page, 16, 7)
    page.wait_for_timeout(500)
    enter_ms = timed_press(page, "ArrowRight", 17, 0)
    page.wait_for_function("() => window.__finalFrame?.qa?.beat === 'W01'", timeout=15000)
    page.wait_for_timeout(180)
    nav01_before = page.evaluate("() => window.__finalFrame")
    nav01_ms = timed_press(page, "ArrowRight", 17, 1)
    record("NAV-01 W01 accepts one NEXT without a stability gate", state(page)["step"] == 1, {"enterMs": enter_ms, "observedHeadlessMs": nav01_ms, "beforePhase": nav01_before["phase"], "beforeT": nav01_before["qa"]["localTime"]})

    page.wait_for_timeout(80)
    nav02_before = page.evaluate("() => window.__finalFrame")
    nav02_ms = timed_press(page, "ArrowRight", 17, 2)
    record("NAV-02 W04 accepts one NEXT without a stability gate", state(page)["step"] == 2, {"observedHeadlessMs": nav02_ms, "beforePhase": nav02_before["phase"]})

    nav03_ms = timed_press(page, "ArrowLeft", 17, 1)
    page.wait_for_function("() => window.__finalFrame?.qa?.beat === 'W04' && window.__finalFrame?.phase === 'stable'", timeout=3000)
    record("NAV-03 one PREVIOUS reconstructs prior beat", state(page)["step"] == 1, {"observedHeadlessMs": nav03_ms, "frame": page.evaluate("() => window.__finalFrame")})

    timed_press(page, "ArrowRight", 17, 2)
    timed_press(page, "ArrowRight", 17, 3)
    page.wait_for_timeout(220)
    nav04_ms = timed_press(page, "ArrowRight", 17, 4)
    record("NAV-04 W06 accepts one NEXT during gesture", state(page)["step"] == 4, {"observedHeadlessMs": nav04_ms})

    timed_press(page, "ArrowRight", 17, 5)
    page.wait_for_function("() => window.__finalFrame?.qa?.beat === 'W08' && window.__finalFrame?.phase === 'stable'", timeout=5000)
    hold_a = page.evaluate("() => ({cam: window.__finalFrame.camPos, target: window.__finalFrame.camTarget, lights: window.__finalFrame.lights, pose: window.__finalFrame.techPose})")
    page.wait_for_timeout(20000)
    hold_b = page.evaluate("() => ({cam: window.__finalFrame.camPos, target: window.__finalFrame.camTarget, lights: window.__finalFrame.lights, pose: window.__finalFrame.techPose})")
    record("NAV-05 W08 hold remains compositionally stable for 20s", hold_a == hold_b, {"before": hold_a, "after": hold_b})

    timed_press(page, "ArrowRight", 17, 6)
    page.wait_for_timeout(220)
    nav06_ms = timed_press(page, "ArrowRight", 18, 0)
    record("NAV-06 W09 accepts NEXT during blackout", nav06_ms < 300, {"nextMs": nav06_ms})

    nav07_ms = timed_press(page, "ArrowLeft", 17, 6)
    page.wait_for_function("() => window.__finalFrame?.qa?.beat === 'W09' && window.__finalFrame?.phase === 'stable'", timeout=15000)
    restored = page.evaluate("() => window.__finalFrame")
    record("NAV-07 credits PREVIOUS restores completed W09", nav07_ms < 300 and all(v == 0 for v in restored["lights"].values()), {"previousMs": nav07_ms, "lights": restored["lights"]})

    page.goto(f"{BASE}?dev=1&slide=17&step=0&finalQuality=safe", wait_until="domcontentloaded")
    wait_state(page, 17, 0)
    for _ in range(3):
        page.keyboard.press("ArrowRight")
    wait_state(page, 17, 3)
    record("NAV-08 three fast physical presses advance three beats", state(page)["step"] == 3, state(page))

    page.goto(f"{BASE}?dev=1&slide=17&step=0&finalQuality=safe", wait_until="domcontentloaded")
    wait_state(page, 17, 0)
    page.keyboard.down("ArrowRight")
    for _ in range(8):
        page.evaluate("() => window.dispatchEvent(new KeyboardEvent('keydown', {key:'ArrowRight', code:'ArrowRight', repeat:true, bubbles:true}))")
    page.keyboard.up("ArrowRight")
    wait_state(page, 17, 1)
    page.wait_for_timeout(120)
    record("NAV-09 held key repeat is ignored", state(page)["step"] == 1, state(page))

    page.goto(f"{BASE}?dev=1&slide=17&step=6&finalQuality=safe", wait_until="domcontentloaded")
    page.wait_for_function("() => window.__finalFrame?.qa?.beat === 'W09' && window.__finalFrame?.phase === 'stable'", timeout=15000)
    direct = page.evaluate("() => window.__finalFrame")
    record("NAV-10 direct W09 snapshot is final black", all(v == 0 for v in direct["lights"].values()) and direct["blackout"] == 1, {"lights": direct["lights"], "blackout": direct["blackout"]})

    profile_checks = {}
    for profile in ("safe", "balanced", "cinematic"):
        page.goto(f"{BASE}?finalKitchen=1&finalBeat=W08&finalQuality={profile}", wait_until="domcontentloaded")
        page.wait_for_function("() => Boolean(window.__finalPost && window.__finalFrame)", timeout=20000)
        profile_checks[profile] = page.evaluate("() => ({beat: window.__finalFrame.qa.beat, phase: window.__finalFrame.phase, dpr: window.devicePixelRatio, profile: window.__finalPost.profile})")
    record("NAV-11 quality reload preserves selected beat", all(v["beat"] == "W08" for v in profile_checks.values()), profile_checks)

    page.goto(f"{BASE}?finalKitchen=1&finalBeat=W01&finalQuality=safe&finalReduced=1", wait_until="domcontentloaded")
    page.wait_for_function("() => window.__finalFrame?.qa?.beat === 'W01' && window.__finalFrame?.phase === 'stable'", timeout=10000)
    reduced = page.evaluate("() => window.__finalFrame")
    record("NAV-12 reduced motion resolves the dive safely", reduced["qa"]["diveP"] == 0, reduced["qa"])

    fade = page.evaluate(
        """() => {
          const d = window.__finalDirector;
          const vp = {width:1280,height:720,aspect:16/9};
          return [0,375,750].map(t => { const f=d.evaluateFinalFrame('W09',t,vp,true,false); return {t,screen:f.lights.screen,spot:f.lights.spot,ambient:f.lights.ambient,blackout:f.blackout}; });
        }"""
    )
    together = fade[0]["screen"] == 1 and fade[0]["spot"] == 1 and 0 < fade[1]["screen"] < 1 and 0 < fade[1]["spot"] < 1 and fade[2]["screen"] == 0 and fade[2]["spot"] == 0
    record("BLACKOUT house and phone fade in the same W09 transition", together, fade)
    record("Browser console has no errors", not errors, errors)

    OUT.write_text(json.dumps({"passed": sum(r["pass"] for r in results), "total": len(results), "results": results, "consoleErrors": errors}, indent=2), encoding="utf-8")
    browser.close()

failed = [r for r in results if not r["pass"]]
print(f"{len(results) - len(failed)}/{len(results)} PASS -> {OUT}", flush=True)
raise SystemExit(1 if failed else 0)
