import * as THREE from 'three'
const W=1280,H=720,FOV=36,ASPECT=W/H
function mkCam(pos,target){const cam=new THREE.PerspectiveCamera(FOV,ASPECT,0.015,40);cam.position.set(...pos);cam.lookAt(new THREE.Vector3(...target));cam.updateMatrixWorld();return cam}
function px(cam,p){const v=new THREE.Vector3(...p).project(cam);return{x:(v.x*0.5+0.5)*W,y:(-v.y*0.5+0.5)*H}}
function bb(cam,pts){const q=pts.map(p=>px(cam,p));const xs=q.map(r=>r.x),ys=q.map(r=>r.y);return{x0:Math.min(...xs),x1:Math.max(...xs),y0:Math.min(...ys),y1:Math.max(...ys)}}
const topL=[1.325,1.85,-2.0],topR=[2.175,1.85,-2.0],botL=[1.325,0,-1.98],botR=[2.175,0,-1.98]
const rows=[]
for(let cz=1.4;cz<=2.8;cz+=0.1){
  for(let cy=1.1;cy<=1.9;cy+=0.1){
    for(let cx=0.9;cx<=2.1;cx+=0.1){
      const cam=mkCam([cx,cy,cz],[1.78,0.85,-2.1])
      const b=bb(cam,[topL,topR,botL,botR])
      const bh=0
      rows.push({cx:+cx.toFixed(1),cy:+cy.toFixed(1),cz:+cz.toFixed(1),bh:+((b.y1-b.y0)/H).toFixed(3),x0:Math.round(b.x0),x1:Math.round(b.x1),y0:Math.round(b.y0),y1:Math.round(b.y1)})
    }
  }
}
// ¿alguno llega a bh 0.70-0.79?
const ok=rows.filter(r=>r.bh>=0.70&&r.bh<=0.79)
console.log('con bh 0.70-0.79:',ok.length)
ok.slice(0,10).forEach(r=>console.log(JSON.stringify(r)))
console.log('max bh:',Math.max(...rows.map(r=>r.bh)))
// puerta y manzana para el mejor bh
const best=ok.sort((a,b)=>Math.abs(a.bh-0.745)-Math.abs(b.bh-0.745))[0]
if(best){const cam=mkCam([best.cx,best.cy,best.cz],[1.78,0.85,-2.1])
console.log('doorEdge',JSON.stringify(px(cam,[1.543,0.66,-1.451])))
console.log('apple',JSON.stringify(px(cam,[1.55,0.05,-1.2])))
console.log('smoke',JSON.stringify(px(cam,[1.7,1.8,-2.7])))}
