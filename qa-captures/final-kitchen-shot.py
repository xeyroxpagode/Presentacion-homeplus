from pathlib import Path
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={'width': 1280, 'height': 720}, device_scale_factor=1)
    page.goto('http://127.0.0.1:8085/?finalKitchen=1&finalBeat=W06&finalPose=P1')
    page.wait_for_load_state('networkidle')
    page.wait_for_function("() => window.__finalFrame?.qa.beat === 'W06'")
    page.screenshot(path=str(Path(__file__).resolve().parent / 'harness-w06-probe.png'))
    print(page.evaluate('window.__finalFrame && {beat: window.__finalFrame.qa.beat, cam: window.__finalFrame.camPos}'))
    print('MATH', page.evaluate('window.__finalQA?.contactQA() && {coverage: window.__finalQA.contactQA().p1Coverage, max: window.__finalQA.contactQA().maxP1Dist, hand: window.__finalQA.contactQA().leftHandErr}'))
    print('OBJECTS', page.evaluate("""() => {
      const scene = window.__finalScene;
      return ['TECHNICIAN_ROOT','TECH_TORSO','TECH_HEAD','TECH_SHOULDER_R','TECH_WRIST_R','TOOL_SOCKET','TECH_HAND_L','TECH_KNEE_R','TECH_ANKLE_L','SERVICE_SCREW','FRIDGE_SERVICE_PANEL'].map(name => {
        const o = scene?.getObjectByName(name);
        if (!o) return {name, missing: true};
        const p = o.getWorldPosition(scene.position.clone());
        const tip = name === 'TOOL_SOCKET' ? o.localToWorld(o.position.clone().set(0, -0.19, 0)).toArray() : undefined;
        return {name, p: p.toArray(), tip, visible: o.visible};
      });
    }"""))
    browser.close()
