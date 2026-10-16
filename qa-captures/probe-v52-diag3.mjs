import * as THREE from 'three'
const W=1280,H=720,FOV=36,ASPECT=W/H
const DEG=Math.PI/180,TH=42*DEG
const HINGE=[2.175,-2.02],DIR=[-Math.cos(TH),Math.sin(TH)],N=[Math.sin(TH),Math.cos(TH)],LEAF_LEN=0.85,LEAF_Y=[0,1.325]
const AABBS=[[1.325,0,-2.68,2.175,1.85,-2.38],[1.325,0,-2.38,1.385,1.85,-2.02],[1.325,1.325,-2.02,2.175,1.85,-1.975]]
function segAABB(p0,p1,box){let t0=0,t1=1;for(let i=0;i<3;i++){const d=p1[i]-p0[i];if(Math.abs(d)<1e-9){if(p0[i]<box[i]||p0[i]>box[i+3])return false;continue}let a=(box[i]-p0[i])/d,b=(box[i+3]-p0[i])/d;if(a>b)[a,b]=[b,a];t0=Math.max(t0,a);t1=Math.min(t1,b);if(t0>t1)return false}return true}
function segLeaf(p0,p1){const dx=p1[0]-p0[0],dz=p1[2]-p0[2];const denom=dx*N[0]+dz*N[1];if(Math.abs(denom)<1e-9)return false;const s=((HINGE[0]-p0[0])*N[0]+(HINGE[1]-p0[2])*N[1])/denom;if(s<0||s>1)return false;const x=p0[0]+dx*s,z=p0[2]+dz*s,y=p0[1]+(p1[1]-p0[1])*s;if(y<LEAF_Y[0]||y>LEAF_Y[1])return false;const rel=(x-HINGE[0])*DIR[0]+(z-HINGE[1])*DIR[1];return rel>=0&&rel<=LEAF_LEN}
function visible(camPos,p){const c0=[camPos[0],camPos[1],camPos[2]],p1=[p.x,p.y,p.z];if(segLeaf(c0,p1))return'LEAF';for(const box of AABBS)if(segAABB(c0,p1,box))return'AABB'+JSON.stringify(box);return true}
function mkCam(pos,target){const cam=new THREE.PerspectiveCamera(FOV,ASPECT,0.015,40);cam.position.set(...pos);cam.lookAt(new THREE.Vector3(...target));cam.updateMatrixWorld();return cam}
function px(cam,p){const v=new THREE.Vector3(...p).project(cam);return{x:Math.round((v.x*0.5+0.5)*W),y:Math.round((-v.y*0.5+0.5)*H)}}
const FOODS={apple:[1.794,0.4175,-1.771],eggA:[1.92,0.8075,-1.885],eggB:[1.697,0.8075,-1.684],bottle:[1.72,0.695,-2.22]}
for(const pos of [[0.35,0.95,-1.15],[0.5,1.1,-1.0],[0.3,1.2,-0.9],[0.6,1.25,-0.8],[0.2,1.3,-1.2],[0.45,1.35,-1.05]]){
  const cam=mkCam(pos,[1.8,0.6,-2.1])
  console.log('pos',JSON.stringify(pos))
  for(const [k,p] of Object.entries(FOODS)){
    const q=px(cam,p);const v=visible(pos,{x:p[0],y:p[1],z:p[2]})
    console.log(' ',k,JSON.stringify(q),v===true?'VISIBLE':'BLOQUEADO '+v)
  }
}
