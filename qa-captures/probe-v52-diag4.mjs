import * as THREE from 'three'
const W=1280,H=720,FOV=36,ASPECT=W/H
const DEG=Math.PI/180,TH=42*DEG
const HINGE=[2.175,-2.02],DIR=[-Math.cos(TH),Math.sin(TH)],N=[Math.sin(TH),Math.cos(TH)],LEAF_LEN=0.85,LEAF_Y=[0,1.325]
const AABBS=[[1.325,0,-2.68,2.175,1.85,-2.38],[1.325,0,-2.38,1.385,1.85,-2.02],[1.325,1.325,-2.02,2.175,1.85,-1.975]]
function segAABB(p0,p1,box){let t0=0,t1=1;for(let i=0;i<3;i++){const d=p1[i]-p0[i];if(Math.abs(d)<1e-9){if(p0[i]<box[i]||p0[i]>box[i+3])return false;continue}let a=(box[i]-p0[i])/d,b=(box[i+3]-p0[i])/d;if(a>b)[a,b]=[b,a];t0=Math.max(t0,a);t1=Math.min(t1,b);if(t0>t1)return false}return true}
function segLeaf(p0,p1){const dx=p1[0]-p0[0],dz=p1[2]-p0[2];const denom=dx*N[0]+dz*N[1];if(Math.abs(denom)<1e-9)return false;const s=((HINGE[0]-p0[0])*N[0]+(HINGE[1]-p0[2])*N[1])/denom;if(s<0||s>1)return false;const x=p0[0]+dx*s,z=p0[2]+dz*s,y=p0[1]+(p1[1]-p0[1])*s;if(y<LEAF_Y[0]||y>LEAF_Y[1])return false;const rel=(x-HINGE[0])*DIR[0]+(z-HINGE[1])*DIR[1];return rel>=0&&rel<=LEAF_LEN}
function visible(camPos,p){const c0=[camPos[0],camPos[1],camPos[2]],p1=[p.x,p.y,p.z];if(segLeaf(c0,p1))return false;for(const box of AABBS)if(segAABB(c0,p1,box))return false;return true}
function mkCam(pos,target){const cam=new THREE.PerspectiveCamera(FOV,ASPECT,0.015,40);cam.position.set(...pos);cam.lookAt(new THREE.Vector3(...target));cam.updateMatrixWorld();return cam}
function px(cam,p){const v=new THREE.Vector3(...p).project(cam);return{x:(v.x*0.5+0.5)*W,y:(-v.y*0.5+0.5)*H}}
function bb(cam,pts){const q=pts.map(p=>px(cam,p));const xs=q.map(r=>r.x),ys=q.map(r=>r.y);return{x0:Math.min(...xs),x1:Math.max(...xs),y0:Math.min(...ys),y1:Math.max(...ys)}}
const half=(c,r,ry)=>[[c[0]-r,c[1]-(ry??r),c[2]-r],[c[0]+r,c[1]+(ry??r),c[2]+r]]
const FOODS={apple:half([1.794,0.4175,-1.771],0.045),eggA:half([1.92,0.8075,-1.885],0.032),eggB:half([1.697,0.8075,-1.684],0.032),bottle:half([1.72,0.695,-2.22],0.05,0.14)}
const foodsFlat=Object.values(FOODS).flat()
for(const [pos,tgt] of [[[0.3,1.2,-0.9],[1.8,0.6,-2.1]],[[0.5,1.1,-1.0],[1.8,0.6,-2.1]],[[0.35,1.25,-0.75],[1.82,0.62,-2.05]]]){
  const camPos=pos
  const cam=mkCam(pos,tgt)
  console.log('pos',JSON.stringify(pos),'tgt',JSON.stringify(tgt))
  for(const [k,pts] of Object.entries(FOODS)){
    const c=[(pts[0][0]+pts[1][0])/2,(pts[0][1]+pts[1][1])/2,(pts[0][2]+pts[1][2])/2]
    const b=bb(cam,pts)
    console.log(' ',k,'vis:',visible(camPos,{x:c[0],y:c[1],z:c[2]}),'px',JSON.stringify({x0:Math.round(b.x0),x1:Math.round(b.x1),y0:Math.round(b.y0),y1:Math.round(b.y1)}),'size',Math.round(b.x1-b.x0),'x',Math.round(b.y1-b.y0))
  }
  const all=bb(cam,foodsFlat)
  console.log('  all',JSON.stringify({x0:Math.round(all.x0),x1:Math.round(all.x1),y0:Math.round(all.y0),y1:Math.round(all.y1)}),'aw',((all.x1-all.x0)/W).toFixed(2),'ah',((all.y1-all.y0)/H).toFixed(2))
  console.log('  flank',JSON.stringify(px(cam,[1.325,1.5,-2.0])),'doorEdge',JSON.stringify(px(cam,[1.543,0.9,-1.451])),'cavBack',JSON.stringify(px(cam,[2.05,1.3,-2.35])))
}
