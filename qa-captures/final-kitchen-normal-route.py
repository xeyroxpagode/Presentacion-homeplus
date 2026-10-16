from pathlib import Path
from playwright.sync_api import sync_playwright

OUT = Path(__file__).resolve().parent
SLIDE_STEPS_BEFORE_S17 = [6, 9, 11, 6, 4, 6, 2, 5, 5, 5, 3, 3, 4, 5, 5, 5]

def capture(page, name):
    path = OUT / f'normal-{name}.png'
    page.screenshot(path=str(path), animations='disabled')
    print('CAPTURE', path)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={'width': 1280, 'height': 720}, device_scale_factor=1)
    errors = []
    page.on('console', lambda msg: errors.append(msg.text) if msg.type == 'error' else None)
    page.on('pageerror', lambda error: errors.append(str(error)))
    page.goto('http://localhost:8085/')
    page.wait_for_load_state('networkidle')
    page.locator('[data-slide-id="S01"]').wait_for()
    page.wait_for_timeout(1000)
    capture(page, 's01')
    for count in SLIDE_STEPS_BEFORE_S17:
        for _ in range(count):
            page.keyboard.press('ArrowRight')
            page.wait_for_timeout(30)
    page.locator('[data-slide-id="S17"]').wait_for(timeout=15000)
    for _ in range(3):
        page.keyboard.press('ArrowRight')
    page.locator('[data-slide-id="S17"][data-step-index="3"]').wait_for()
    page.locator('.final-kitchen-stage[data-preparing="true"]').wait_for(state='attached')
    page.wait_for_function("() => window.__finalFrame?.qa.beat === 'W00'")
    page.keyboard.press('ArrowRight')
    page.locator('[data-slide-id="FINAL_KITCHEN"]').wait_for()
    page.keyboard.press('ArrowRight')
    assert page.locator('[data-slide-id="FINAL_KITCHEN"][data-step-index="0"]').count() == 1, 'Double NEXT during travelling advanced'
    page.locator('.final-kitchen-stage[data-final-beat="W02"]').wait_for(timeout=15000)
    capture(page, 'final-wide')
    for step, beat in [(1, 'W04'), (2, 'W05'), (3, 'W06')]:
        page.keyboard.press('ArrowRight')
        page.locator(f'[data-slide-id="FINAL_KITCHEN"][data-step-index="{step}"]').wait_for()
        page.locator(f'.final-kitchen-stage[data-final-beat="{beat}"]').wait_for()
        page.wait_for_function("() => window.__finalFrame?.phase === 'stable'", timeout=10000)
        if beat == 'W04':
            capture(page, 'backpack')
    page.wait_for_timeout(2300)
    capture(page, 'w06')
    for step, beat in [(4, 'W07'), (5, 'W08')]:
        page.keyboard.press('ArrowRight')
        page.locator(f'[data-slide-id="FINAL_KITCHEN"][data-step-index="{step}"]').wait_for()
        page.locator(f'.final-kitchen-stage[data-final-beat="{beat}"]').wait_for()
        page.wait_for_function("() => window.__finalFrame?.phase === 'stable'", timeout=10000)
    page.keyboard.press('ArrowRight')
    page.locator('.final-kitchen-stage[data-final-beat="W09"]').wait_for()
    page.keyboard.press('ArrowRight')
    assert page.locator('[data-slide-id="FINAL_KITCHEN"][data-step-index="6"]').count() == 1, 'Double NEXT during dim advanced'
    page.wait_for_function("() => window.__finalFrame?.qa.beat === 'W09' && window.__finalFrame?.phase === 'stable'", timeout=10000)
    assert page.evaluate("window.__finalFrame.lights.screen") == 1, 'Phone dimmed during room shutdown'
    assert page.evaluate("window.__finalFrame.blackout") == 0, 'Room shutdown started blackout early'
    capture(page, 'dim')
    page.wait_for_timeout(500)
    assert page.evaluate("window.__finalFrame.qa.beat") == 'W09', 'Dim did not hold'
    page.keyboard.press('ArrowRight')
    page.locator('.final-kitchen-stage[data-final-beat="W14"]').wait_for()
    page.wait_for_function("() => window.__finalFrame?.qa.beat === 'W14' && window.__finalFrame?.phase === 'stable'", timeout=10000)
    capture(page, 'black')
    page.keyboard.press('ArrowLeft')
    page.locator('.final-kitchen-stage[data-final-beat="W09"]').wait_for()
    page.wait_for_function("() => window.__finalFrame?.qa.beat === 'W09' && window.__finalFrame?.phase === 'stable'", timeout=10000)
    page.keyboard.press('ArrowRight')
    page.locator('.final-kitchen-stage[data-final-beat="W14"]').wait_for()
    page.wait_for_function("() => window.__finalFrame?.qa.beat === 'W14' && window.__finalFrame?.phase === 'stable'", timeout=10000)
    page.keyboard.press('ArrowRight')
    page.locator('[data-slide-id="S18"]').wait_for()
    page.keyboard.press('ArrowRight')
    page.locator('[data-slide-id="S18"][data-step-index="1"]').wait_for()
    capture(page, 's18')
    assert not page.locator('.presentation-dev').count(), 'Production debug HUD visible'
    assert not errors, errors
    print('PASS normal route, two shutdown taps, PREVIOUS, double NEXT guard, console clean')
    browser.close()
