import * as THREE from 'three'
const W=1280,H=720,FOV=36,ASPECT=W/H
function mkCam(pos,target){const cam=new THREE.PerspectiveCamera(FOV,ASPECT,0.015,40);cam.position.set(...pos);cam.lookAt(new THREE.Vector3(...target));cam.updateMatrixWorld();return cam}
function px(cam,p){const v=new THREE.Vector3(...p).project(cam);return{x:Math.round((v.x*0.5+0.5)*W),y:Math.round((-v.y*0.5+0.5)*H)}}
function bb(cam,pts){const q=pts.map(p=>px(cam,p));const xs=q.map(r=>r.x),ys=q.map(r=>r.y);return{x0:Math.round(Math.min(...xs)),x1:Math.round(Math.max(...xs)),y0:Math.round(Math.min(...ys)),y1:Math.round(Math.max(...ys))}}
const cav=[[-2.27,1.6,-2.7],[-0.25,2.3,-2.7]]
const items={jar:[-2.17,1.8875,-2.89],box:[-0.51,1.8675,-2.85],pack:[-0.1,2.1125,-2.88],canTop:[-1.91,2.0975,-2.89]}
const counterEdge=[[-2.06,0.92,-2.37],[0.36,0.92,-2.37]]
for(const [pos,tgt] of [[[-0.22,1.68,0.05],[-0.7,1.62,-2.7]],[[-0.3,2.0,0.1],[-0.7,1.72,-2.7]],[[-0.35,2.1,0.0],[-0.8,1.75,-2.7]],[[-0.25,2.15,-0.2],[-0.75,1.7,-2.7]],[[-0.4,2.2,-0.35],[-0.8,1.78,-2.7]]]){
  const cam=mkCam(pos,tgt)
  const b=bb(cam,cav)
  console.log('pos',JSON.stringify(pos),'tgt',JSON.stringify(tgt))
  console.log('  cav',JSON.stringify(b),'bw',((b.x1-b.x0)/W).toFixed(2))
  console.log('  items',Object.entries(items).map(([k,p])=>k+':'+JSON.stringify(px(cam,p))).join(' '))
  console.log('  counterEdge',JSON.stringify(bb(cam,counterEdge)))
}
