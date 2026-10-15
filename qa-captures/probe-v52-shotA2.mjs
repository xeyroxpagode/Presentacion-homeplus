import * as THREE from 'three'
const W=1280,H=720,FOV=36,ASPECT=W/H
const POLICY_CENTER=new THREE.Vector3(-0.05,0.9255,-0.38)
const POLICY_SIZE={x:0.27,z:0.36},POLICY_YAW=0.1
function corners(hx,hz,cz=0,y=0.9255){
  const cs=Math.cos(POLICY_YAW),sn=Math.sin(POLICY_YAW)
  return [[hx,cz+hz],[hx,cz-hz],[-hx,cz-hz],[-hx,cz+hz]].map(([x,z])=>new THREE.Vector3(POLICY_CENTER.x+x*cs+z*sn,y,POLICY_CENTER.z-x*sn+z*cs))
}
function mkCam(d,elevDeg,azimDeg){
  const e=elevDeg*Math.PI/180,a=azimDeg*Math.PI/180
  const cam=new THREE.PerspectiveCamera(FOV,ASPECT,0.015,40)
  cam.position.set(POLICY_CENTER.x-d*Math.cos(e)*Math.sin(a),POLICY_CENTER.y+d*Math.sin(e),POLICY_CENTER.z+d*Math.cos(e)*Math.cos(a))
  cam.lookAt(POLICY_CENTER);cam.updateMatrixWorld();return cam
}
function px(cam,p){const v=p.clone().project(cam);return{x:(v.x*0.5+0.5)*W,y:(-v.y*0.5+0.5)*H}}
function bb(cam,pts){const q=pts.map(p=>px(cam,p));const xs=q.map(r=>r.x),ys=q.map(r=>r.y);return{x0:Math.min(...xs),x1:Math.max(...xs),y0:Math.min(...ys),y1:Math.max(...ys)}}
const phoneC=(cx,cz)=>[[cx-0.0375,cz-0.076],[cx+0.0375,cz+0.076]].map(([x,z])=>new THREE.Vector3(x,0.924,z))
const keysC=(cx,cz)=>[[cx-0.055,cz-0.032],[cx+0.055,cz+0.032]].map(([x,z])=>new THREE.Vector3(x,0.931,z))
for(const [name,d,e,a] of [['azim36',1.06,56,36],['azim46',1.02,56,46]]){
  const cam=mkCam(d,e,a)
  const s=bb(cam,corners(0.135,0.18))
  const st=bb(cam,corners(0.0878,0.027,-0.03,0.9265))
  const ph=bb(cam,phoneC(0.1,-0.02))
  const k1=bb(cam,keysC(-0.35,-0.43))
  console.log(name,'pos',cam.position.toArray().map(v=>+v.toFixed(3)))
  console.log(' sheet',JSON.stringify({x0:Math.round(s.x0),x1:Math.round(s.x1),y0:Math.round(s.y0),y1:Math.round(s.y1)}))
  console.log(' stamp',JSON.stringify({x0:Math.round(st.x0),x1:Math.round(st.x1),y0:Math.round(st.y0),y1:Math.round(st.y1)}))
  console.log(' phone',JSON.stringify({x0:Math.round(ph.x0),x1:Math.round(ph.x1),y0:Math.round(ph.y0),y1:Math.round(ph.y1)}))
  console.log(' keys(-0.35,-0.43)',JSON.stringify({x0:Math.round(k1.x0),x1:Math.round(k1.x1),y0:Math.round(k1.y0),y1:Math.round(k1.y1)}))
}
