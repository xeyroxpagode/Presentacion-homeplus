import json
import math
import time
from pathlib import Path

from playwright.sync_api import sync_playwright


ROOT = Path(__file__).resolve().parent
BASE = "http://127.0.0.1:5199/"
RESULTS = []


def record(name, passed, detail=None):
    RESULTS.append({"name": name, "pass": bool(passed), "detail": detail})
    print(("PASS" if passed else "FAIL"), name, detail or "", flush=True)


def wait_harness(page):
    page.wait_for_function(
        "() => Boolean(window.__finalQA && window.__finalFrame && window.__finalScene)",
        timeout=20000,
    )


def set_pose(page, pose):
    page.evaluate(
        """pose => {
          const url = new URL(location.href);
          if (pose) url.searchParams.set('finalPose', pose);
          else url.searchParams.delete('finalPose');
          history.replaceState(null, '', url);
        }""",
        pose,
    )


def jump(page, beat, pose=None):
    set_pose(page, pose)
    page.evaluate("beat => window.__finalQA.goJump(beat)", beat)
    page.wait_for_function("beat => window.__finalFrame?.qa?.beat === beat", arg=beat, timeout=10000)
    page.wait_for_timeout(180)


def technician_scene_state(page):
    return page.evaluate(
        """() => {
          const scene = window.__finalScene;
          const root = scene.getObjectByName('TECHNICIAN_ROOT');
          const counts = { skinnedMeshes: 0, bones: 0 };
          scene.traverse(node => {
            if (node.isSkinnedMesh) counts.skinnedMeshes += 1;
            if (node.isBone) counts.bones += 1;
          });
          return {
            rootPresent: Boolean(root),
            rootVisible: Boolean(root?.visible),
            torso: Boolean(scene.getObjectByName('TECH_TORSO')),
            head: Boolean(scene.getObjectByName('TECH_HEAD')),
            rightShoulder: Boolean(scene.getObjectByName('TECH_SHOULDER_R')),
            leftShoulder: Boolean(scene.getObjectByName('TECH_SHOULDER_L')),
            rightKnee: Boolean(scene.getObjectByName('TECH_KNEE_R')),
            leftKnee: Boolean(scene.getObjectByName('TECH_KNEE_L')),
            toolSocket: Boolean(scene.getObjectByName('TOOL_SOCKET')),
            glbRepairOverlay: Boolean(scene.getObjectByName('TECHNICIAN_REPAIR_ARMS')),
            ...counts,
          };
        }"""
    )


def actual_tool_contact(page):
    return page.evaluate(
        """() => {
          const scene = window.__finalScene;
          const tool = scene.getObjectByName('TOOL_SOCKET');
          const screw = scene.getObjectByName('SERVICE_SCREW');
          tool.updateWorldMatrix(true, false);
          screw.updateWorldMatrix(true, false);
          const tip = tool.position.clone().set(0, -0.19, 0);
          tool.localToWorld(tip);
          const target = screw.position.clone();
          screw.getWorldPosition(target);
          return {
            tip: [tip.x, tip.y, tip.z],
            screw: [target.x, target.y, target.z],
            distance: tip.distanceTo(target),
          };
        }"""
    )


def wait_slide(page, slide, step=None, timeout=15000):
    page.wait_for_function(
        """([slide, step]) => {
          const el = document.querySelector('.presentation-scene');
          return el && Number(el.dataset.slideIndex) === slide
            && (step === null || Number(el.dataset.stepIndex) === step);
        }""",
        arg=[slide, step],
        timeout=timeout,
    )


with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    errors = []
    glb_requests = []
    page = browser.new_page(viewport={"width": 1280, "height": 720})
    page.on("console", lambda msg: errors.append(msg.text) if msg.type == "error" else None)
    page.on("pageerror", lambda err: errors.append(str(err)))
    page.on(
        "request",
        lambda req: glb_requests.append(req.url)
        if "characterMedium.glb" in req.url or "humanMaleA.png" in req.url
        else None,
    )
    page.goto(f"{BASE}?finalKitchen=1&finalQuality=safe", wait_until="domcontentloaded")
    wait_harness(page)

    shots = [
        ("W02", "w02-wide", None),
        ("W04", "w04-continuity", None),
        ("W05", "w05-invoice-continuity", None),
        ("W06", "w06-initial-p0", "P0"),
        ("W06", "w06-repair-p1", "P1"),
        ("W06", "w06-final-p2", "P2"),
        ("W07", "w07-present", None),
        ("W08", "w08-hold", None),
    ]
    presence = {}
    for beat, label, pose in shots:
        jump(page, beat, pose)
        presence[label] = technician_scene_state(page)
        page.screenshot(path=str(ROOT / f"{label}-1280x720.png"), animations="allow")

    record(
        "Procedural technician hierarchy is mounted in every required beat",
        all(v["rootPresent"] and v["rootVisible"] and v["toolSocket"] for v in presence.values()),
        presence,
    )
    w06_state = presence["w06-repair-p1"]
    record(
        "Historical low-poly rig is active instead of the GLB skeleton",
        w06_state["torso"]
        and w06_state["head"]
        and w06_state["rightShoulder"]
        and w06_state["leftShoulder"]
        and w06_state["rightKnee"]
        and w06_state["leftKnee"]
        and not w06_state["glbRepairOverlay"]
        and w06_state["skinnedMeshes"] == 0
        and w06_state["bones"] == 0,
        w06_state,
    )
    record("GLB and human texture are not requested at runtime", not glb_requests, glb_requests)

    jump(page, "W06", "P1")
    contact = actual_tool_contact(page)
    math_qa = page.evaluate("() => window.__finalQA.contactQA()")
    record("Rendered screwdriver tip contacts the service screw", contact["distance"] <= 0.02, contact)
    record(
        "Baked contact and kneeling QA remain within contract",
        math_qa["p1Coverage"] >= 0.8
        and math_qa["maxBakedTipErr"] <= 0.002
        and 0.05 <= math_qa["kneeY"] <= 0.1
        and 0.05 <= math_qa["footY"] <= 0.12,
        {
            "p1Coverage": math_qa["p1Coverage"],
            "maxBakedTipErr": math_qa["maxBakedTipErr"],
            "kneeY": math_qa["kneeY"],
            "footY": math_qa["footY"],
            "leftHandErr": math_qa["leftHandErr"],
        },
    )

    set_pose(page, None)
    jump(page, "W05")
    page.evaluate("() => window.__finalQA.goNext()")
    page.wait_for_function("() => window.__finalFrame?.qa?.beat === 'W06'", timeout=10000)
    real_motion = []
    for _ in range(9):
        real_motion.append(
            page.evaluate(
                """() => ({
                  t: window.__finalFrame.qa.localTime,
                  gestureT: window.__finalFrame.gestureT,
                  phase: window.__finalFrame.phase,
                  contact: window.__finalFrame.gestureT == null ? null : window.__finalQA.contactQA().p1Coverage,
                })"""
            )
        )
        page.wait_for_timeout(220)
    gesture_samples = [s["gestureT"] for s in real_motion if s["gestureT"] is not None]
    record(
        "W06 plays in real time with deterministic gesture progression",
        len(gesture_samples) >= 4
        and max(gesture_samples) - min(gesture_samples) >= 800
        and all(b >= a for a, b in zip(gesture_samples, gesture_samples[1:])),
        real_motion,
    )

    jump(page, "W05")
    page.evaluate("() => window.__finalQA.goNext()")
    page.wait_for_function("() => window.__finalFrame?.qa?.beat === 'W06'", timeout=10000)
    page.wait_for_timeout(240)
    interrupt_before = page.evaluate(
        "() => ({phase: window.__finalFrame.phase, gestureT: window.__finalFrame.gestureT})"
    )
    started = time.perf_counter()
    page.evaluate("() => window.__finalQA.goNext()")
    page.wait_for_function(
        "() => document.querySelector('.final-kitchen-stage')?.dataset.finalBeat === 'W07'",
        timeout=3000,
    )
    interrupt_ms = (time.perf_counter() - started) * 1000
    record(
        "W06 accepts NEXT during the gesture without a stability gate",
        interrupt_before["phase"] == "transition",
        {"before": interrupt_before, "headlessCommitMs": round(interrupt_ms, 1)},
    )

    reverse_before = page.evaluate(
        """() => ({
          stageBeat: document.querySelector('.final-kitchen-stage')?.dataset.finalBeat,
          renderedBeat: window.__finalFrame?.qa?.beat,
          renderedPhase: window.__finalFrame?.phase,
        })"""
    )
    started = time.perf_counter()
    page.evaluate("() => window.__finalQA.goPrev()")
    page.wait_for_function(
        "() => document.querySelector('.final-kitchen-stage')?.dataset.finalBeat === 'W06'",
        timeout=3000,
    )
    reverse_ms = (time.perf_counter() - started) * 1000
    page.wait_for_function("() => window.__finalFrame?.qa?.beat === 'W06'", timeout=3000)
    reverse = {
        "before": reverse_before,
        "headlessCommitMs": round(reverse_ms, 1),
        "state": technician_scene_state(page),
    }
    record(
        "ArrowLeft from W07 restores W06 without a stability gate and keeps the technician present",
        reverse_before["stageBeat"] == "W07" and reverse["state"]["rootVisible"],
        reverse,
    )

    jump(page, "W08")
    cam_a = page.evaluate("() => ({pos: window.__finalFrame.camPos, target: window.__finalFrame.camTarget})")
    rotations = []
    for _ in range(5):
        rotations.append(
            page.evaluate(
                """() => {
                  const s = window.__finalScene;
                  return {
                    torso: s.getObjectByName('TECH_TORSO').rotation.x,
                    head: s.getObjectByName('TECH_HEAD').rotation.x,
                  };
                }"""
            )
        )
        page.wait_for_timeout(5000)
    cam_b = page.evaluate("() => ({pos: window.__finalFrame.camPos, target: window.__finalFrame.camTarget})")
    torso_range = max(r["torso"] for r in rotations) - min(r["torso"] for r in rotations)
    camera_delta = max(
        abs(a - b)
        for a, b in zip(cam_a["pos"] + cam_a["target"], cam_b["pos"] + cam_b["target"])
    )
    record(
        "W08 remains compositionally stable for 20s with subtle body life",
        camera_delta <= 1e-9 and 0.0001 < torso_range < 0.03,
        {"cameraDelta": camera_delta, "torsoRange": torso_range, "rotations": rotations},
    )

    page.set_viewport_size({"width": 1440, "height": 900})
    jump(page, "W06", "P1")
    page.screenshot(path=str(ROOT / "w06-repair-p1-1440x900.png"), animations="allow")
    page.set_viewport_size({"width": 390, "height": 844})
    jump(page, "W06", "P1")
    page.screenshot(path=str(ROOT / "w06-repair-p1-390x844.png"), animations="allow")

    reduced = browser.new_page(viewport={"width": 1280, "height": 720}, reduced_motion="reduce")
    reduced.on("console", lambda msg: errors.append(msg.text) if msg.type == "error" else None)
    reduced.on("pageerror", lambda err: errors.append(str(err)))
    reduced.goto(
        f"{BASE}?finalKitchen=1&finalBeat=W06&finalQuality=safe&finalReduced=1",
        wait_until="domcontentloaded",
    )
    wait_harness(reduced)
    reduced_state = technician_scene_state(reduced)
    reduced_frame = reduced.evaluate("() => window.__finalFrame")
    record(
        "Reduced motion resolves safely with the procedural technician present",
        reduced_frame["phase"] == "stable" and reduced_state["rootVisible"],
        {"phase": reduced_frame["phase"], "scene": reduced_state},
    )
    reduced.close()

    presentation = browser.new_page(viewport={"width": 1280, "height": 720})
    presentation.on("console", lambda msg: errors.append(msg.text) if msg.type == "error" else None)
    presentation.on("pageerror", lambda err: errors.append(str(err)))
    presentation.goto(
        f"{BASE}?dev=1&slide=17&step=0&finalQuality=safe",
        wait_until="domcontentloaded",
    )
    wait_slide(presentation, 17, 0)
    for step in range(1, 7):
        presentation.keyboard.press("ArrowRight")
        wait_slide(presentation, 17, step)
    presentation.wait_for_function(
        "() => window.__finalFrame?.qa?.beat === 'W09' && window.__finalFrame?.phase === 'stable'",
        timeout=15000,
    )
    blackout = presentation.evaluate("() => window.__finalFrame")
    presentation.keyboard.press("ArrowRight")
    wait_slide(presentation, 18, 0)
    record(
        "Complete closing reaches credits and W09 blacks out house and phone together",
        blackout["blackout"] == 1 and all(v == 0 for v in blackout["lights"].values()),
        {"blackout": blackout["blackout"], "lights": blackout["lights"]},
    )
    presentation.close()

    record("Browser console stays free of errors", not errors, errors)
    (ROOT / "results.json").write_text(
        json.dumps(
            {
                "passed": sum(r["pass"] for r in RESULTS),
                "total": len(RESULTS),
                "results": RESULTS,
                "consoleErrors": errors,
                "glbRequests": glb_requests,
            },
            indent=2,
        ),
        encoding="utf-8",
    )
    browser.close()


failed = [r for r in RESULTS if not r["pass"]]
print(f"{len(RESULTS) - len(failed)}/{len(RESULTS)} PASS", flush=True)
raise SystemExit(1 if failed else 0)
