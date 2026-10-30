from pathlib import Path
from playwright.sync_api import sync_playwright

OUT = Path(__file__).resolve().parent / "camera-probe"
OUT.mkdir(parents=True, exist_ok=True)
CANDIDATES = {
    "a-right-front": ([2.65, 1.15, -0.85], [1.42, 0.48, -2.0]),
    "b-right-side": ([2.55, 1.25, -1.35], [1.42, 0.48, -2.0]),
    "c-left-front": ([0.15, 1.15, -0.75], [1.42, 0.48, -2.0]),
    "d-left-side": ([0.4, 1.0, -1.4], [1.42, 0.44, -2.0]),
    "e-left-wide": ([-0.4, 1.45, 0.3], [1.35, 0.55, -1.9]),
    "f-left-balanced": ([0.3, 1.35, 0.1], [1.35, 0.55, -1.9]),
    "g-left-high": ([0.15, 1.8, -0.05], [1.38, 0.52, -1.96]),
    "h-left-aisle": ([-0.75, 1.08, -0.55], [1.4, 0.34, -1.98]),
    "i-left-aisle-high": ([-0.85, 1.42, -0.65], [1.4, 0.38, -1.98]),
    "j-over-shoulder-wide": ([-0.25, 1.2, -0.95], [1.43, 0.3, -1.99]),
}

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1280, "height": 720})
    page.goto("http://127.0.0.1:5199/?finalKitchen=1&finalQuality=safe&finalBeat=W06&finalPose=P1", wait_until="domcontentloaded")
    page.wait_for_function("() => Boolean(window.__finalDirector && window.__finalFrame)", timeout=20000)
    page.evaluate(
        """() => {
          const director = window.__finalDirector;
          window.__originalFinalEvaluate = director.evaluateFinalFrame.bind(director);
          director.evaluateFinalFrame = (...args) => {
            const frame = window.__originalFinalEvaluate(...args);
            const probe = window.__cameraProbe;
            if (probe) return {...frame, camPos: probe.pos, camTarget: probe.target, camUp: [0, 1, 0]};
            return frame;
          };
        }"""
    )
    for name, (position, target) in CANDIDATES.items():
        page.evaluate("probe => { window.__cameraProbe = probe; }", {"pos": position, "target": target})
        page.wait_for_timeout(180)
        page.screenshot(path=str(OUT / f"{name}.png"))
    page.evaluate("probe => { window.__cameraProbe = probe; }", {"pos": CANDIDATES["i-left-aisle-high"][0], "target": CANDIDATES["i-left-aisle-high"][1]})
    for name, yaw in {"yaw-24": 2.4, "yaw-27": 2.7, "yaw-34": 3.4, "yaw-37": 3.7}.items():
        page.evaluate("yaw => { const root = window.__finalScene?.getObjectByName?.('TECHNICIAN_ROOT'); if (root?.children?.[0]) root.children[0].rotation.y = yaw; }", yaw)
        page.wait_for_timeout(180)
        page.screenshot(path=str(OUT / f"{name}.png"))
    browser.close()
