import * as THREE from 'three'
const W=1280,H=720,FOV=36,ASPECT=W/H
function mkCam(pos,target){const cam=new THREE.PerspectiveCamera(FOV,ASPECT,0.015,40);cam.position.set(...pos);cam.lookAt(new THREE.Vector3(...target));cam.updateMatrixWorld();return cam}
function px(cam,p){const v=new THREE.Vector3(...p).project(cam);return{x:(v.x*0.5+0.5)*W,y:(-v.y*0.5+0.5)*H}}
function bb(cam,pts){const q=pts.map(p=>px(cam,p));const xs=q.map(r=>r.x),ys=q.map(r=>r.y);return{x0:Math.min(...xs),x1:Math.max(...xs),y0:Math.min(...ys),y1:Math.max(...ys)}}
// alimentos V5.2 @42° (botella AL DERECHA de la cavidad para cámara izquierda)
const F={
  apple:[[1.749,0.3725,-1.816],[1.839,0.4625,-1.726]],
  eggA:[[1.888,0.7755,-1.917],[1.952,0.8395,-1.853]],
  eggB:[[1.665,0.7755,-1.716],[1.729,0.8395,-1.652]],
  bottle:[[1.67,0.555,-2.27],[1.77,0.835,-2.17]],
}
const foodsFlat=Object.values(F).flat()
const out=[]
for(let cx=0.15;cx<=0.75;cx+=0.05){
  for(let cy=0.85;cy<=1.15;cy+=0.05){
    for(let cz=-1.35;cz<=-0.85;cz+=0.05){
      for(let tx=1.62;tx<=1.92;tx+=0.06){
        for(let ty=0.5;ty<=0.75;ty+=0.05){
          for(let tz=-2.25;tz<=-1.95;tz+=0.06){
            const cam=mkCam([cx,cy,cz],[tx,ty,tz])
            let ok=true;const fb={}
            for(const [k,pts] of Object.entries(F)){fb[k]=bb(cam,pts);const b=fb[k];if(b.x0<70||b.x1>1210||b.y0<50||b.y1>670){ok=false;break}}
            if(!ok)continue
            if(Math.abs((fb.eggA.x0+fb.eggA.x1)/2-(fb.eggB.x0+fb.eggB.x1)/2)<20)continue
            const all=bb(cam,foodsFlat)
            const aw=(all.x1-all.x0)/W,ah=(all.y1-all.y0)/H
            if(aw<0.2||ah<0.2)continue
            // flanco izquierdo del cuerpo visible
            const flank=px(cam,[1.325,1.0,-2.0])
            if(flank.x<70||flank.x>1210||flank.y<50||flank.y>670)continue
            // borde libre de la puerta visible (lectura de puerta abierta)
            const de=px(cam,[1.543,0.9,-1.451])
            if(de.x<70||de.x>1210||de.y<50||de.y>670)continue
            // interior de cavidad (pared trasera) en frame
            const cb=px(cam,[2.1,1.2,-2.355])
            if(cb.x<70||cb.x>1210||cb.y<50||cb.y>670)continue
            out.push({pos:[+cx.toFixed(2),+cy.toFixed(2),+cz.toFixed(2)],tgt:[+tx.toFixed(2),+ty.toFixed(2),+tz.toFixed(2)],aw:+aw.toFixed(2),ah:+ah.toFixed(2)})
          }
        }
      }
    }
  }
}
out.sort((a,b)=>(b.aw+b.ah)-(a.aw+a.ah))
console.log('top 8:');out.slice(0,8).forEach(r=>console.log(JSON.stringify(r)))
if(!out.length)console.log('SIN CANDIDATOS')
