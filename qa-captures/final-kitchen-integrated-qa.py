from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent
URL = 'http://127.0.0.1:8085/'

def shot(page, name):
    path = ROOT / f'integrated-{name}.png'
    page.screenshot(path=str(path), animations='disabled')
    print('CAPTURE', path)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    context = browser.new_context(viewport={'width': 1280, 'height': 720}, device_scale_factor=1)
    page = context.new_page()
    errors = []
    page.on('console', lambda msg: errors.append(msg.text) if msg.type == 'error' else None)
    page.on('pageerror', lambda err: errors.append(str(err)))
    page.goto(URL)
    page.wait_for_load_state('networkidle')
    page.locator('[data-slide-id="S01"]').wait_for()
    shot(page, 's01-0')
    for _ in range(5):
        page.keyboard.press('ArrowRight')
        page.wait_for_timeout(1750)
    shot(page, 's01-5')
    print('S01_TEC', page.locator('canvas').count())

    page.goto(URL + '?dev=1&slide=16&step=3')
    page.wait_for_load_state('networkidle')
    page.locator('.final-kitchen-stage[data-preparing="true"]').wait_for(state='attached')
    shot(page, 'homi-prep')
    page.keyboard.press('ArrowRight')
    page.locator('[data-slide-id="FINAL_KITCHEN"]').wait_for()
    try:
        page.locator('.final-kitchen-stage[data-final-beat="W02"]').wait_for(timeout=15000)
    except Exception:
        print('ENTRY_DIAGNOSTIC', page.locator('.final-kitchen-stage').get_attribute('data-final-beat'), page.evaluate('window.__finalFrame && {beat: window.__finalFrame.qa.beat, t: window.__finalFrame.qa.localTime, phase: window.__finalFrame.phase}'), errors)
        shot(page, 'entry-diagnostic')
        raise
    shot(page, 'final-wide')
    print('ENTRY', page.locator('.presentation-scene').get_attribute('data-step-index'), page.locator('.final-kitchen-stage').get_attribute('data-final-beat'))

    for step, beat in [(1, 'W04'), (2, 'W05'), (3, 'W06')]:
        page.keyboard.press('ArrowRight')
        page.locator(f'.presentation-scene[data-step-index="{step}"]').wait_for(timeout=5000)
        page.locator(f'.final-kitchen-stage[data-final-beat="{beat}"]').wait_for(timeout=5000)
        page.wait_for_timeout(900)
    page.wait_for_timeout(2900)
    shot(page, 'w06')
    print('W06_FRAME', page.evaluate('window.__finalFrame && {beat: window.__finalFrame.qa.beat, pose: window.__finalFrame.techPose, cam: window.__finalFrame.camPos}'))

    for step, beat in [(4, 'W07'), (5, 'W08')]:
        page.keyboard.press('ArrowRight')
        page.locator(f'.presentation-scene[data-step-index="{step}"]').wait_for(timeout=5000)
        page.locator(f'.final-kitchen-stage[data-final-beat="{beat}"]').wait_for(timeout=5000)
        page.wait_for_timeout(900)
    page.keyboard.press('ArrowRight')
    page.locator('.final-kitchen-stage[data-final-beat="W09"]').wait_for(timeout=5000)
    page.wait_for_timeout(3300)
    shot(page, 'dim')
    print('DIM', page.evaluate('window.__finalFrame && {beat: window.__finalFrame.qa.beat, lights: window.__finalFrame.lights}'))
    page.keyboard.press('ArrowRight')
    page.locator('.final-kitchen-stage[data-final-beat="W14"]').wait_for(timeout=5000)
    page.wait_for_timeout(750)
    shot(page, 'black')
    print('BLACK', page.evaluate('window.__finalFrame && {beat: window.__finalFrame.qa.beat, blackout: window.__finalFrame.blackout}'))
    page.keyboard.press('ArrowRight')
    page.locator('[data-slide-id="S18"]').wait_for(timeout=5000)
    shot(page, 's18')
    print('ERRORS', errors)
    context.close()
    browser.close()
