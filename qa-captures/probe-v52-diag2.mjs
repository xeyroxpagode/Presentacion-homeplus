import * as THREE from 'three'
const W=1280,H=720,FOV=36,ASPECT=W/H
function mkCam(pos,target){const cam=new THREE.PerspectiveCamera(FOV,ASPECT,0.015,40);cam.position.set(...pos);cam.lookAt(new THREE.Vector3(...target));cam.updateMatrixWorld();return cam}
function px(cam,p){const v=new THREE.Vector3(...p).project(cam);return{x:Math.round((v.x*0.5+0.5)*W),y:Math.round((-v.y*0.5+0.5)*H)}}
function bb(cam,pts){const q=pts.map(p=>px(cam,p));return{x0:Math.min(...q.map(r=>r.x)),x1:Math.max(...q.map(r=>r.x)),y0:Math.min(...q.map(r=>r.y)),y1:Math.max(...q.map(r=>r.y))}}
const F={topL:[1.325,1.85,-2.0],topR:[2.175,1.85,-2.0],botL:[1.325,0,-1.98],botR:[2.175,0,-1.98]}
for(const pos of [[1.3,1.65,1.55],[1.35,1.68,1.6],[1.4,1.62,1.5],[1.25,1.6,1.65]]){
  const cam=mkCam(pos,[1.78,0.85,-2.1])
  const b=bb(cam,[F.topL,F.topR,F.botL,F.botR])
  const bh=((b.y1-b.y0)/H).toFixed(3)
  console.log('pos',JSON.stringify(pos),'body',JSON.stringify(b),'bh',bh)
  console.log('  doorEdge',JSON.stringify(px(cam,[1.543,0.66,-1.451])),'apple',JSON.stringify(px(cam,[1.55,0.05,-1.2])),'smoke0',JSON.stringify(px(cam,[1.75,1.88,-2.66])),'eggLand',JSON.stringify(px(cam,[1.44,0.032,-1.8])))
}
