"""CINE-01 adversarial browser QA.

Runs against the integrated presentation, exercises the real keyboard navigation,
and records deterministic state evidence without modifying presentation state.
"""

import json
import os
import time
from pathlib import Path

from playwright.sync_api import sync_playwright


ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "qa-captures" / "cine01" / "final"
OUT.mkdir(parents=True, exist_ok=True)
BASE = os.environ.get("CINE01_BASE", "http://127.0.0.1:8451")
CHROME = os.environ.get("CINE01_CHROME", r"C:\Program Files\Google\Chrome\Application\chrome.exe")

results = []
errors = []


def record(name, passed, detail=None):
    results.append({"name": name, "passed": bool(passed), "detail": detail})
    print(("PASS" if passed else "FAIL"), name, "" if passed or detail is None else detail)


def attach_diagnostics(page, label):
    page.on("pageerror", lambda exc: errors.append(f"[{label}] pageerror: {exc}"))
    page.on(
        "console",
        lambda msg: errors.append(f"[{label}] console: {msg.text}")
        if msg.type == "error" and "favicon" not in msg.text.lower() and "Failed to load resource" not in msg.text
        else None,
    )
    page.on(
        "requestfailed",
        lambda request: errors.append(f"[{label}] requestfailed: {request.url} {request.failure}"),
    )


def goto_s01(page, step=0, profile="cinematic"):
    page.goto(
        f"{BASE}/?dev=1&slide=0&step={step}&s01Renderer=three&s01Quality={profile}",
        wait_until="networkidle",
    )
    page.wait_for_function("() => window.__s01Director && window.__s01ThreeDebug && window.__s01Post")


def wait_s01(page, step, timeout=12000):
    page.wait_for_function(
        "([step]) => window.__s01Director?.step === step && !window.__s01Director?.animating",
        arg=[step],
        timeout=timeout,
    )


def snapshot(page):
    return page.evaluate(
        """() => {
          const d = window.__s01Director;
          const f = d.frame;
          const round = (n) => Math.round(n * 100000) / 100000;
          const v = (a) => a.map(round);
          return {
            step: d.step, elapsed: round(d.elapsed), animating: d.animating,
            camPos: v(f.camPos), camTarget: v(f.camTarget), camUp: v(f.camUp),
            pantry: v(f.pantry), fTop: round(f.fTop), fBot: round(f.fBot),
            drawer: round(f.drawer), policy: {p:v(f.policy.p), r:v(f.policy.r)},
            docs: f.docs.map(x => ({p:v(x.p), r:v(x.r), v:round(x.v)})),
            dishes: f.dishes.map(x => ({p:v(x.p), r:v(x.r), v:round(x.v)})),
            fov: window.__s01ThreeDebug.camera.fov,
            profile: window.__s01Post.profile,
          };
        }"""
    )


def strip_clock(value):
    clean = dict(value)
    clean.pop("elapsed", None)
    return clean


def stable_hold(page, label):
    first = strip_clock(snapshot(page))
    page.wait_for_timeout(550)
    second = strip_clock(snapshot(page))
    record(label, first == second, {"first": first, "second": second} if first != second else first)


with sync_playwright() as playwright:
    browser = playwright.chromium.launch(headless=True, executable_path=CHROME)

    # Normal forward, stable holds, repeat suppression, and reverse restoration.
    context = browser.new_context(viewport={"width": 1280, "height": 720}, device_scale_factor=1)
    page = context.new_page()
    attach_diagnostics(page, "navigation")
    goto_s01(page)
    endpoints = {"0": snapshot(page)}
    stable_hold(page, "S01.0 stable hold")
    for step in range(1, 6):
        page.keyboard.press("ArrowRight")
        wait_s01(page, step)
        endpoints[str(step)] = snapshot(page)
        stable_hold(page, f"S01.{step} stable hold")

    page.evaluate("window.dispatchEvent(new KeyboardEvent('keydown',{key:'ArrowRight',repeat:true,bubbles:true}))")
    page.wait_for_timeout(100)
    record("repeated keydown ignored", page.locator('.presentation-scene').get_attribute('data-slide-id') == 'S01')

    for step in range(4, -1, -1):
        page.keyboard.press("ArrowLeft")
        wait_s01(page, step)
        now = snapshot(page)
        record(f"reverse restores S01.{step}", strip_clock(now) == strip_clock(endpoints[str(step)]))

    # Rapid interruptions: pantry/fridge and fridge/docs/wide.
    page.keyboard.press("ArrowRight")
    page.wait_for_timeout(90)
    page.keyboard.press("ArrowLeft")
    wait_s01(page, 0)
    record("S01.0<->S01.1 interruption converges", strip_clock(snapshot(page)) == strip_clock(endpoints["0"]))
    for _ in range(2):
        page.keyboard.press("ArrowRight")
        page.wait_for_timeout(120)
    page.keyboard.press("ArrowLeft")
    wait_s01(page, 1)
    record("pantry/fridge interruption converges", strip_clock(snapshot(page)) == strip_clock(endpoints["1"]))
    page.keyboard.press("ArrowRight")
    wait_s01(page, 2)
    page.keyboard.press("ArrowRight")
    page.wait_for_timeout(240)
    page.keyboard.press("ArrowRight")
    page.wait_for_timeout(160)
    page.keyboard.press("ArrowLeft")
    wait_s01(page, 3)
    stable_hold(page, "interrupted fridge/docs hold remains stable")
    context.close()

    # Deep links and physical endpoint constraints for every S01 state.
    for step in range(6):
        ctx = browser.new_context(viewport={"width": 1280, "height": 720})
        p = ctx.new_page()
        attach_diagnostics(p, f"deep-{step}")
        goto_s01(p, step)
        state = snapshot(p)
        record(f"deep link S01.{step}", state["step"] == step and not state["animating"] and state["fov"] == 36, state)
        ctx.close()
    record(
        "physical hinge/drawer limits",
        abs(endpoints["3"]["fTop"]) <= 0.22
        and abs(endpoints["3"]["fBot"]) <= 0.88
        and 0 <= endpoints["4"]["drawer"] <= 0.241,
        {"fTop": endpoints["3"]["fTop"], "fBot": endpoints["3"]["fBot"], "drawer": endpoints["4"]["drawer"]},
    )

    # Quality profiles preserve narrative endpoint geometry.
    profile_states = {}
    for profile in ("cinematic", "balanced", "safe"):
        ctx = browser.new_context(viewport={"width": 1280, "height": 720})
        p = ctx.new_page()
        attach_diagnostics(p, f"profile-{profile}")
        goto_s01(p, 4, profile)
        profile_states[profile] = strip_clock(snapshot(p))
        ctx.close()
    geometry_keys = ("camPos", "camTarget", "pantry", "fTop", "fBot", "drawer", "policy", "docs", "dishes", "fov")
    geometry = {name: {key: state[key] for key in geometry_keys} for name, state in profile_states.items()}
    record("quality profiles preserve narrative geometry", geometry["cinematic"] == geometry["balanced"] == geometry["safe"], geometry)

    # OS reduced-motion defaults to safe profile and still reaches canonical holds.
    context = browser.new_context(viewport={"width": 1280, "height": 720}, reduced_motion="reduce")
    page = context.new_page()
    attach_diagnostics(page, "reduced")
    page.goto(f"{BASE}/?dev=1&slide=0&step=0&s01Renderer=three", wait_until="networkidle")
    page.wait_for_function("() => window.__s01Director && window.__s01Post")
    page.keyboard.press("ArrowRight")
    wait_s01(page, 1)
    reduced = page.evaluate("() => ({reduced:window.__s01Director.reduced, profile:window.__s01Post.profile})")
    record("reduced motion uses safe profile", reduced == {"reduced": True, "profile": "safe"}, reduced)
    stable_hold(page, "reduced-motion endpoint stable")
    context.close()

    # Resize/aspect regeneration and portal-to-S02 handoff.
    context = browser.new_context(viewport={"width": 1280, "height": 720})
    page = context.new_page()
    attach_diagnostics(page, "handoff")
    goto_s01(page, 5)
    before_resize = snapshot(page)
    page.set_viewport_size({"width": 1920, "height": 1080})
    page.wait_for_timeout(250)
    after_resize = snapshot(page)
    record("16:9 resize preserves portal pose and FOV", before_resize["camPos"] == after_resize["camPos"] and after_resize["fov"] == 36)
    page.keyboard.press("ArrowRight")
    page.locator('[data-slide-id="S02"]').wait_for(timeout=6000)
    page.locator('.s02-stage[data-step="0"]').wait_for(state="visible", timeout=6000)
    record("S01.5→S02.0 handoff visible", page.locator('canvas').count() >= 1 and page.locator('.s02-stage[data-step="0"]').is_visible())
    page.screenshot(path=str(OUT / "handoff-s02-0-1920x1080.png"), animations="disabled")
    context.close()

    # Integrated Final Kitchen remains independently operational.
    context = browser.new_context(viewport={"width": 1280, "height": 720})
    page = context.new_page()
    attach_diagnostics(page, "final-kitchen")
    page.goto(f"{BASE}/?dev=1&slide=17&step=0", wait_until="networkidle")
    page.locator('[data-slide-id="FINAL_KITCHEN"]').wait_for(timeout=8000)
    page.locator('.final-kitchen-stage').wait_for(timeout=8000)
    page.wait_for_function("() => window.__finalFrame?.qa?.beat === 'W02'", timeout=16000)
    final_state = page.evaluate("() => ({beat:window.__finalFrame.qa.beat, blackout:window.__finalFrame.blackout, canvases:document.querySelectorAll('canvas').length})")
    record("Final Kitchen independent canvas reaches W02", final_state["beat"] == "W02" and final_state["blackout"] == 0 and final_state["canvases"] >= 1, final_state)
    page.screenshot(path=str(OUT / "final-kitchen-w02-1280x720.png"), animations="disabled")
    context.close()

    # All slide endpoints mount without runtime errors; short wait catches lazy failures.
    slide_steps = [5, 8, 10, 2, 4, 5, 1, 4, 1, 3, 0, 2, 0, 6, 6, 7, 7, 7, 3]
    context = browser.new_context(viewport={"width": 1280, "height": 720}, reduced_motion="reduce")
    page = context.new_page()
    attach_diagnostics(page, "all-slides")
    mounted = []
    for slide, last in enumerate(slide_steps):
        for step in sorted({0, last}):
            page.goto(f"{BASE}/?dev=1&slide={slide}&step={step}", wait_until="domcontentloaded")
            page.locator(f'.presentation-scene[data-slide-index="{slide}"][data-step-index="{step}"]').wait_for(timeout=8000)
            page.wait_for_timeout(120)
            mounted.append([slide, step])
    expected_mounts = sum(len({0, last}) for last in slide_steps)
    record("all presentation endpoints mount", len(mounted) == expected_mounts, mounted)
    context.close()

    browser.close()

report = {
    "base": BASE,
    "generatedAt": time.strftime("%Y-%m-%dT%H:%M:%S%z"),
    "passed": all(item["passed"] for item in results) and not errors,
    "tests": results,
    "runtimeErrors": errors,
}
(OUT / "adversarial-results.json").write_text(json.dumps(report, indent=2, ensure_ascii=False), encoding="utf-8")
print("RUNTIME_ERRORS", json.dumps(errors, ensure_ascii=False))
raise SystemExit(0 if report["passed"] else 1)
