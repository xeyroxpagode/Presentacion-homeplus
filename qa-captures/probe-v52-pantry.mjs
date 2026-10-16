import * as THREE from 'three'
const W=1280,H=720,FOV=36,ASPECT=W/H
function mkCam(pos,target){const cam=new THREE.PerspectiveCamera(FOV,ASPECT,0.015,40);cam.position.set(...pos);cam.lookAt(new THREE.Vector3(...target));cam.updateMatrixWorld();return cam}
function px(cam,p){const v=new THREE.Vector3(...p).project(cam);return{x:(v.x*0.5+0.5)*W,y:(-v.y*0.5+0.5)*H}}
function bb(cam,pts){const q=pts.map(p=>px(cam,p));const xs=q.map(r=>r.x),ys=q.map(r=>r.y);return{x0:Math.min(...xs),x1:Math.max(...xs),y0:Math.min(...ys),y1:Math.max(...ys)}}
// cavidades abiertas: modulos A (-2.27..-1.05) y B (-0.97..0.25), y 1.6..2.3
const cav=[[-2.27,1.6,-2.7],[-0.25,2.3,-2.7]]
const items={jar:[-2.17,1.8875,-2.89],box:[-0.51,1.8675,-2.85],pack:[-0.1,2.1125,-2.88],canTop:[-1.91,2.0975,-2.89]}
const counterEdge=[[-2.06,0.92,-2.37],[0.36,0.92,-2.37]]
const out=[]
for(let cx=-0.5;cx<=0.1;cx+=0.05){
  for(let cy=1.8;cy<=2.25;cy+=0.05){
    for(let cz=-0.35;cz<=0.45;cz+=0.05){
      for(let tx=-0.95;tx<=-0.45;tx+=0.05){
        for(let ty=1.62;ty<=1.82;ty+=0.04){
          const cam=mkCam([cx,cy,cz],[tx,ty,-2.7])
          const b=bb(cam,cav)
          const bw=(b.x1-b.x0)/W
          if(bw<0.7||bw>0.78)continue
          if(b.x0<70||b.x1>1210||b.y0<50||b.y1>670)continue
          // mesada trasera: borde superior debajo de y 600 (franja inferior) o fuera
          const ce=bb(cam,counterEdge)
          if(ce.y0<600)continue
          // productos dentro de safe
          let ok=true
          for(const [k,p] of Object.entries(items)){const q=px(cam,p);if(q.x<70||q.x>1210||q.y<50||q.y>670){ok=false;break}}
          if(!ok)continue
          out.push({pos:[+cx.toFixed(2),+cy.toFixed(2),+cz.toFixed(2)],tgt:[+tx.toFixed(2),+ty.toFixed(2)],bw:+bw.toFixed(2),cav:JSON.stringify({x0:Math.round(b.x0),x1:Math.round(b.x1),y0:Math.round(b.y0),y1:Math.round(b.y1)}),counterTopY:Math.round(ce.y0)})
        }
      }
    }
  }
}
out.sort((a,b)=>b.bw-a.bw)
console.log('top 8:');out.slice(0,8).forEach(r=>console.log(JSON.stringify(r)))
if(!out.length)console.log('SIN CANDIDATOS')
