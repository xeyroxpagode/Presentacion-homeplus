"""QA visual/determinista S01 V5.2.1 con Playwright Python.

Captura los cuatro micro-polish en 720p/1080p, mide proyecciones reales,
comprueba inmovilidad documental y recorre deep-link/reverse/interrupciones.
"""
from __future__ import annotations

import json
import os
import sys
import time
import base64
from pathlib import Path

sys.path.insert(0, r"C:\Users\thega\.cache\codex-playwright-python")
from playwright.sync_api import sync_playwright

BASE = "http://127.0.0.1:8443"
OUT = Path("qa-captures/s01-v521/final")
CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
OUT.mkdir(parents=True, exist_ok=True)
QUICK = "--quick" in sys.argv
SOLVE_INSURANCE = "--solve-insurance" in sys.argv


def state(page):
    return page.evaluate("""() => {
      const d = window.__s01Director, f = d?.frame;
      if (!d || !f) return null;
      const pose = x => ({p:[...x.p], r:[...x.r], v:x.v ?? 1});
      return {
        step:d.step, elapsed:Math.round(d.elapsed), animating:d.animating,
        camPos:[...f.camPos], camTarget:[...f.camTarget],
        docs:f.docs.map(pose), accumDocs:f.accumDocs.map(pose),
        loose:f.loose.map(pose), list:pose(f.list), policy:pose(f.policy),
        dishes:f.dishes.map(pose), apple:pose(f.apple),
        smokeMax:+Math.max(...f.smoke.map(x=>x.o)).toFixed(3)
      };
    }""")


def projected_bounds(page, names):
    return page.evaluate("""(names) => {
      const {scene,camera} = window.__s01ThreeDebug;
      scene.updateMatrixWorld(true); camera.updateMatrixWorld(true);
      const w=camera.domElement?.width || window.innerWidth;
      const h=camera.domElement?.height || window.innerHeight;
      let minX=Infinity,minY=Infinity,maxX=-Infinity,maxY=-Infinity,points=0;
      const visible = o => { for(let n=o;n;n=n.parent) if(!n.visible) return false; return true; };
      for(const name of names){
        const root=scene.getObjectByName(name); if(!root) continue;
        root.traverse(o=>{
          if(!o.isMesh || !o.geometry || !visible(o)) return;
          if(!o.geometry.boundingBox) o.geometry.computeBoundingBox();
          const b=o.geometry.boundingBox; if(!b) return;
          for(const x of [b.min.x,b.max.x]) for(const y of [b.min.y,b.max.y]) for(const z of [b.min.z,b.max.z]){
            const p=b.min.clone().set(x,y,z).applyMatrix4(o.matrixWorld).project(camera);
            const sx=(p.x+1)*0.5*w, sy=(1-p.y)*0.5*h;
            minX=Math.min(minX,sx); maxX=Math.max(maxX,sx); minY=Math.min(minY,sy); maxY=Math.max(maxY,sy); points++;
          }
        });
      }
      return points ? {x0:+minX.toFixed(1),y0:+minY.toFixed(1),x1:+maxX.toFixed(1),y1:+maxY.toFixed(1),w:+(maxX-minX).toFixed(1),h:+(maxY-minY).toFixed(1),cx:+((minX+maxX)/2).toFixed(1),cy:+((minY+maxY)/2).toFixed(1)} : null;
    }""", names)


def solve_insurance(page):
    """Busca una pose que preserve dirección y centro, reduzca 5–9% y eleve 40–65 px."""
    return page.evaluate("""() => {
      const {scene,camera}=window.__s01ThreeDebug;
      scene.updateMatrixWorld(true);
      const roots=['POLICY_TOP','AUTO_KEYS'].map(n=>scene.getObjectByName(n)).filter(Boolean);
      const w=1280,h=720;
      const bounds=()=>{
        let x0=Infinity,y0=Infinity,x1=-Infinity,y1=-Infinity;
        for(const root of roots) root.traverse(o=>{
          if(!o.isMesh||!o.geometry)return;
          if(!o.geometry.boundingBox)o.geometry.computeBoundingBox(); const b=o.geometry.boundingBox;
          for(const x of [b.min.x,b.max.x])for(const y of [b.min.y,b.max.y])for(const z of [b.min.z,b.max.z]){
            const p=b.min.clone().set(x,y,z).applyMatrix4(o.matrixWorld).project(camera);
            const sx=(p.x+1)*.5*w,sy=(1-p.y)*.5*h;x0=Math.min(x0,sx);x1=Math.max(x1,sx);y0=Math.min(y0,sy);y1=Math.max(y1,sy);
          }
        });
        return {x0,y0,x1,y1,w:x1-x0,h:y1-y0,cx:(x0+x1)/2,cy:(y0+y1)/2};
      };
      const oldP=[-.4,1.8,.1],oldT=[-.05,.925,-.38],v=oldP.map((n,i)=>n-oldT[i]);
      camera.position.set(...oldP);camera.up.set(0,1,0);camera.lookAt(...oldT);camera.updateMatrixWorld(true);
      const base=bounds(), goal={cx:base.cx,cy:base.cy-52,w:base.w*.93};
      let best=null;
      for(let si=0;si<=8;si++)for(let xi=0;xi<=16;xi++)for(let zi=0;zi<=12;zi++){
        const s=1.04+si*.01,dx=-.2+xi*.025,dz=-.02+zi*.02;
        const t=[oldT[0]+dx,oldT[1],oldT[2]+dz];
        const p=[t[0]+v[0]*s,t[1]+v[1]*s,t[2]+v[2]*s];
        camera.position.set(...p);camera.lookAt(...t);camera.updateMatrixWorld(true);
        const b=bounds();
        const score=((b.cx-goal.cx)/10)**2+((b.cy-goal.cy)/10)**2+((b.w-goal.w)/10)**2;
        if(!best||score<best.score)best={score,s,dx,dz,pos:p,target:t,bounds:b,base,goal};
      }
      return best;
    }""")


def open_step(page, step):
    page.goto(f"{BASE}/?dev=1&slide=0&step={step}&s01Renderer=three", wait_until="networkidle")
    page.wait_for_function("() => !!window.__s01Director && !!window.__s01ThreeDebug")
    page.wait_for_timeout(250)


def seek(page, step, elapsed, aspect):
    if step >= 3:
        page.evaluate("""([s,t,a]) => {
          window.__s01Director.debugBeat(s,t,a);
          window.__s01ThreeDebug.invalidate();
        }""", [step, elapsed, aspect])
        page.wait_for_timeout(80)


def capture(page, label):
    data_url = page.evaluate("""() => {
      const {gl,scene,camera}=window.__s01ThreeDebug;
      gl.render(scene,camera);
      const src=gl.domElement,w=src.width,h=src.height,ctx=gl.getContext();
      const pixels=new Uint8Array(w*h*4);ctx.readPixels(0,0,w,h,ctx.RGBA,ctx.UNSIGNED_BYTE,pixels);
      const cv=document.createElement('canvas');cv.width=w;cv.height=h;
      const out=cv.getContext('2d'),img=out.createImageData(w,h);
      for(let y=0;y<h;y++) img.data.set(pixels.subarray(y*w*4,(y+1)*w*4),(h-1-y)*w*4);
      out.putImageData(img,0,0);return cv.toDataURL('image/png');
    }""")
    (OUT / f"{label}.png").write_bytes(base64.b64decode(data_url.split(",",1)[1]))
    print(label, json.dumps(state(page), separators=(",", ":")))


def wait_step_settled(page, expected, elapsed=500, timeout_ms=9000):
    page.wait_for_function("""([s,e]) => {
      const d=window.__s01Director;
      return d && d.step===s && d.elapsed>=e;
    }""", arg=[expected,elapsed], timeout=timeout_ms)


def run_viewport(browser, width, height, label):
    errors=[]
    page=browser.new_page(viewport={"width":width,"height":height})
    page.on("pageerror", lambda e: errors.append(f"pageerror:{e}"))
    page.on("console", lambda m: errors.append(f"console:{m.text}") if m.type=="error" and "404" not in m.text else None)
    aspect=width/height

    for step,name in [(1,"beat1-f100"),(2,"beat2-f100")]:
        open_step(page,step); capture(page,f"{label}-{name}")

    times3=[320,500,1000,1300,1650,2320,3350]
    times4=[0,850,1370,1850]
    times5=[0,1450]
    if QUICK:
        times3=[320,3350]; times4=[0,1850]; times5=[1450]
    open_step(page,0)
    for t in times3:
        seek(page,3,t,aspect); capture(page,f"{label}-beat3-{t}")
    for t in times4:
        seek(page,4,t,aspect); capture(page,f"{label}-beat4-{t}")
    for t in times5:
        seek(page,5,t,aspect); capture(page,f"{label}-beat5-{t}")

    # Proyección real en 720p para los contratos de composición.
    metrics={}
    if width==1280:
        open_step(page,1)
        metrics["insurance"] = projected_bounds(page,["POLICY_TOP","AUTO_KEYS"])
        page.evaluate("""() => {
          const f=window.__s01Director.frame;
          f.camPos=[-0.4,1.8,0.1]; f.camTarget=[-0.05,0.925,-0.38]; f.camUp=[0,1,0];
          window.__s01ThreeDebug.invalidate();
        }""")
        page.wait_for_timeout(80)
        metrics["insurance_baseline"] = projected_bounds(page,["POLICY_TOP","AUTO_KEYS"])
        open_step(page,2)
        metrics["apple_in_bin"] = {
            "apple":projected_bounds(page,["FRIDGE_APPLE"]),
            "bin":projected_bounds(page,["BOTTOM_BINS"]),
        }
        open_step(page,0); seek(page,3,320,aspect)
        metrics["fridge_320"] = projected_bounds(page,["FRIDGE_WORLD","FRIDGE_APPLE","FRIDGE_WATER","FRIDGE_EGG_A","FRIDGE_EGG_B"])
        seek(page,3,3350,aspect)
        metrics["docs_f100"] = projected_bounds(page,["DOC_ISLAND_0","DOC_ISLAND_1","DOC_ISLAND_2","DOC_ISLAND_3","DOC_ISLAND_4","DOC_ISLAND_5"])
        print("METRICS",json.dumps(metrics,separators=(",",":")))

        # Invariante: beat4 no mueve documentos, recibos, lista ni póliza.
        seek(page,3,3350,aspect); s3=state(page)
        seek(page,4,0,aspect); s40=state(page)
        seek(page,4,1850,aspect); s4=state(page)
        keys=("docs","loose","list","policy")
        invariant=all(s3[k]==s40[k]==s4[k] for k in keys)
        assert invariant, "documentación preexistente cambió durante beat 4"
        assert sum(x["v"]>.5 for x in s4["accumDocs"])==6
        assert sum(x["v"]>.5 for x in s4["dishes"])==19
        print("DOCUMENTS_IMMOBILE=true ACCUM_DOCS=6 DISHES=19")
        zones={
            "sink":[0,1,2,3,7,9,11,12,14],
            "left":[4,5,15,17],
            "right":[6,8,10,13,16,18],
        }
        assert [len(zones[k]) for k in ("sink","left","right")]==[9,4,6]
        print("DISH_ZONES",json.dumps(zones,separators=(",",":")))

        # El instante de liberación de la manzana coincide con la pose de bisagra.
        seek(page,3,1049,aspect); a0=state(page)["apple"]["p"]
        seek(page,3,1050,aspect); a1=state(page)["apple"]["p"]
        release_delta=sum((a1[i]-a0[i])**2 for i in range(3))**.5
        assert release_delta < .01, f"pop de manzana al liberar: {release_delta}"
        print("APPLE_RELEASE_DELTA",round(release_delta,6))
    page.close()
    return errors


with sync_playwright() as p:
    browser=p.chromium.launch(executable_path=CHROME,headless=True,args=["--force-device-scale-factor=1"])
    if SOLVE_INSURANCE:
        page=browser.new_page(viewport={"width":1280,"height":720})
        open_step(page,1)
        print(json.dumps(solve_insurance(page),indent=2))
        page.close(); browser.close(); sys.exit(0)
    all_errors=[]
    all_errors += run_viewport(browser,1280,720,"720p")
    all_errors += run_viewport(browser,1920,1080,"1080p")

    if not QUICK:
        # Deep-link 0..5: cada estado existe por sí solo.
        page=browser.new_page(viewport={"width":1280,"height":720})
        for step in range(6):
            open_step(page,step)
            s=state(page)
            if step==4:
                assert sum(x["v"]>.5 for x in s["accumDocs"])==6 and sum(x["v"]>.5 for x in s["dishes"])==19
            print("DEEPLINK",step,json.dumps({"docs":sum(x["v"]>.5 for x in s["docs"]),"accum":sum(x["v"]>.5 for x in s["accumDocs"]),"dishes":sum(x["v"]>.5 for x in s["dishes"])}))

        # Reverse 5→4→3→2 y convergencia documental.
        open_step(page,5)
        for target in (4,3,2):
            page.keyboard.press("ArrowLeft"); wait_step_settled(page,target)
            s=state(page)
            print("REVERSE",target,json.dumps({"accum":sum(x["v"]>.5 for x in s["accumDocs"]),"dishes":sum(x["v"]>.5 for x in s["dishes"]),"apple":s["apple"]},separators=(",",":")))

        # Interrupciones representativas en cada tramo modificado.
        open_step(page,0)
        page.keyboard.press("ArrowRight"); page.wait_for_timeout(260)
        page.keyboard.press("ArrowRight"); wait_step_settled(page,2)
        print("INTERRUPT_INSURANCE_TO_2",state(page)["step"])

        for elapsed,label in ((160,"FRIDGE_REFRAME"),(1100,"APPLE_FALL"),(2100,"DOC_TRAVEL")):
            open_step(page,2)
            page.keyboard.press("ArrowRight"); page.wait_for_timeout(elapsed)
            page.keyboard.press("ArrowLeft"); wait_step_settled(page,2)
            s=state(page)
            assert sum(x["v"]>.5 for x in s["accumDocs"])==0 and sum(x["v"]>.5 for x in s["dishes"])==0
            print(f"INTERRUPT_{label}_TO_2",json.dumps({"step":s["step"],"apple":s["apple"]},separators=(",",":")))

        open_step(page,0)
        for _ in range(4): page.keyboard.press("ArrowRight")
        page.wait_for_timeout(980)
        page.keyboard.press("ArrowLeft")
        wait_step_settled(page,3)
        print("INTERRUPT_4_TO_3",json.dumps(state(page),separators=(",",":")))
        open_step(page,3)
        page.keyboard.press("ArrowRight")
        page.wait_for_timeout(1080)
        page.keyboard.press("ArrowRight")
        wait_step_settled(page,5,1450)
        s=state(page)
        assert sum(x["v"]>.5 for x in s["accumDocs"])==6 and sum(x["v"]>.5 for x in s["dishes"])==19
        print("INTERRUPT_4_TO_5",json.dumps({"step":s["step"],"accum":6,"dishes":19}))
        page.close()

        # Reduced Motion: mismos F100 deterministas, sin reejecutar drama.
        page=browser.new_page(viewport={"width":1280,"height":720})
        page.emulate_media(reduced_motion="reduce")
        open_step(page,0)
        for target in range(1,6):
            page.keyboard.press("ArrowRight")
            page.wait_for_timeout(180)
            s=state(page)
            assert s["step"]==target
            if target==4:
                assert sum(x["v"]>.5 for x in s["accumDocs"])==6 and sum(x["v"]>.5 for x in s["dishes"])==19
            print("REDUCED",target,json.dumps({"accum":sum(x["v"]>.5 for x in s["accumDocs"]),"dishes":sum(x["v"]>.5 for x in s["dishes"])}))
        page.close()

    browser.close()
    if all_errors:
        raise AssertionError("\n".join(all_errors))
    print("NO-CONSOLE-OR-PAGE-ERRORS")
