"use strict";(()=>{function x(){let e=["I","J","L","O","S","T","Z"],o=Math.floor(Math.random()*e.length);return e[o]}function v(e){return e==="I"||e==="O"}function D(e){let{score:o,level:r}=t;if(e===1){t.score=o+r*40;return}if(e===2){t.score=o+r*100;return}if(e===3){t.score=o+r*300;return}if(e===4){t.score=o+r*1200;return}}function d(){let e=y.next;return y.next=x(),{typeCurrent:e,typeNext:y.next,xCurrent:v(e)?5:4.5,yCurrent:v(e)?-2:-1.5}}var p=30,h=48,i={I:{position1:[[-2,-1],[-1,-1],[0,-1],[1,-1]],position2:[[0,-2],[0,-1],[0,0],[0,1]]},J:{position1:[[-1.5,-1.5],[-1.5,-.5],[-.5,-.5],[.5,-.5]],position2:[[-.5,-1.5],[.5,-1.5],[-.5,-.5],[-.5,.5]],position3:[[-1.5,-.5],[-.5,-.5],[.5,-.5],[.5,.5]],position4:[[-.5,-1.5],[-.5,-.5],[-.5,.5],[-1.5,.5]]},L:{position1:[[-1.5,-.5],[-.5,-.5],[.5,-.5],[.5,-1.5]],position2:[[-.5,-1.5],[-.5,-.5],[-.5,.5],[.5,.5]],position3:[[-1.5,-.5],[-1.5,.5],[-.5,-.5],[.5,-.5]],position4:[[-1.5,-1.5],[-.5,-1.5],[-.5,-.5],[-.5,.5]]},O:{position1:[[-1,-1],[0,-1],[-1,0],[0,0]]},S:{position1:[[-1.5,-.5],[-.5,-.5],[-.5,-1.5],[.5,-1.5]],position2:[[-.5,-1.5],[-.5,-.5],[.5,-.5],[.5,.5]]},T:{position1:[[-1.5,-.5],[-.5,-.5],[-.5,-1.5],[.5,-.5]],position2:[[-.5,-1.5],[-.5,-.5],[.5,-.5],[-.5,.5]],position3:[[-1.5,-.5],[-.5,-.5],[.5,-.5],[-.5,.5]],position4:[[-1.5,-.5],[-.5,-1.5],[-.5,-.5],[-.5,.5]]},Z:{position1:[[-1.5,-1.5],[-.5,-1.5],[-.5,-.5],[.5,-.5]],position2:[[-.5,-.5],[-.5,.5],[.5,-.5],[.5,-1.5]]}},f={I:{color:"#22d3ee",offsets:[i.I.position1,i.I.position2]},J:{color:"#818cf8",offsets:[i.J.position1,i.J.position2,i.J.position3,i.J.position4]},L:{color:"#fb923c",offsets:[i.L.position1,i.L.position2,i.L.position3,i.L.position4]},O:{color:"#facc15",offsets:[i.O.position1]},S:{color:"#4ade80",offsets:[i.S.position1,i.S.position2]},T:{color:"#c084fc",offsets:[i.T.position1,i.T.position2,i.T.position3,i.T.position4]},Z:{color:"#fb7185",offsets:[i.Z.position1,i.Z.position2]}},m=document.getElementById("playArea"),y={next:x()},t={...d(),rotation:0,linesCleared:0,level:1,score:0,framesTillDrop:h,lockedCells:[],lockDelayFrame:-1};function R(){let o=f[t.typeCurrent].offsets[t.rotation];return o.every(([r,l])=>l+t.yCurrent<19)?o.every(([r,l])=>t.lockedCells.filter(({xStart:n})=>n===r+t.xCurrent).every(({yStart:n})=>l+t.yCurrent+1!==n)):!1}function E(){let r=f[t.typeCurrent].offsets[t.rotation].map(([n,c])=>c+t.yCurrent),l=[...new Set(r)],s=[];l.forEach(n=>{t.lockedCells.filter(({yStart:C})=>C===n).length===10&&(t.lockedCells=t.lockedCells.filter(({yStart:C})=>C!==n),s.push(n))}),t.lockedCells=t.lockedCells.map(n=>{let c=s.filter(C=>C>n.yStart);return{...n,yStart:n.yStart+c.length}}),D(s.length),t.linesCleared+=s.length}function T(){if(R()){if(t.framesTillDrop>0&&t.lockDelayFrame===-1){t.framesTillDrop=t.framesTillDrop-1;return}if(t.lockDelayFrame===-1){t.framesTillDrop=h,t.yCurrent=t.yCurrent+1;return}}if(t.lockDelayFrame===-1){t.lockDelayFrame=0;return}if(t.lockDelayFrame<30){t.lockDelayFrame++;return}if(t.lockDelayFrame=-1,R())return;f[t.typeCurrent].offsets[t.rotation].forEach(([o,r])=>{t.lockedCells.push({color:f[t.typeCurrent].color,xStart:t.xCurrent+o,yStart:t.yCurrent+r})}),E();let e=d();t.xCurrent=e.xCurrent,t.yCurrent=e.yCurrent,t.typeCurrent=e.typeCurrent,t.typeNext=e.typeNext,t.rotation=0,t.level=Math.ceil((t.linesCleared+1)/10)}function w(e,o,r,l){let s=r*p,n=l*p;e.fillStyle=o,e.fillRect(s,n,p,p),e.strokeRect(s,n,p,p),e.shadowBlur=20,e.shadowColor="#323232",e.fillRect(s+5,n+5,p-10,p-10),e.shadowBlur=0}function I(e,o,r,l){o.offsets[t.rotation].forEach(([s,n])=>{w(e,o.color,r+s,l+n)})}function M(){let o=document.getElementById("next").getContext("2d"),r=f[t.typeNext],l=t.typeNext==="O"?1.5:2;o.clearRect(0,0,m.width,m.height),r.offsets[0].forEach(([s,n])=>{w(o,f[t.typeNext].color,2.5+s,l+n)})}function S(){let e=m.getContext("2d");e.clearRect(0,0,m.width,m.height),I(e,f[t.typeCurrent],t.xCurrent,t.yCurrent),M(),t.lockedCells.forEach(({color:o,xStart:r,yStart:l})=>{w(e,o,r,l)})}function k(e){return A(e)&&N(e)}function N(e){if(e<0)return!1;let{offsets:o}=f[t.typeCurrent];return o[t.rotation].every(([l,s])=>t.lockedCells.filter(({xStart:c})=>c===e+l).every(({yStart:c})=>s+t.yCurrent!==c))}function A(e){return f[t.typeCurrent].offsets[t.rotation].every(([o])=>o+e<=9&&o+e>=0)}function J(){let{offsets:e}=f[t.typeCurrent],o=e[t.rotation].map(([a,u])=>u+t.yCurrent),r=e[t.rotation].map(([a,u])=>a+t.xCurrent),l=Math.max(...o),s=t.lockedCells.filter(({xStart:a,yStart:u})=>r.includes(a)&&u>l);if(s.length===0){let u=o.find(O=>O===l)-t.yCurrent;t.yCurrent=19-u;return}let n=Math.min(...s.map(({yStart:a})=>a)),C=s.filter(({yStart:a})=>a===n).map(({xStart:a})=>a),L=e[t.rotation].filter(([a,u])=>C.includes(a+t.xCurrent)),b=Math.max(...L.map(([a,u])=>u));t.yCurrent=n-1-b}function g(){window.addEventListener("keydown",e=>{switch(e.key){case"ArrowRight":k(t.xCurrent+1)&&(t.xCurrent=t.xCurrent+1);return;case"ArrowLeft":k(t.xCurrent-1)&&(t.xCurrent=t.xCurrent-1);return;case"ArrowUp":let o=t.rotation,r=t.rotation+1;r===f[t.typeCurrent].offsets.length&&(r=0),t.rotation=r,k(t.xCurrent)||(t.rotation=o);return;case"ArrowDown":t.framesTillDrop=t.framesTillDrop-48;return;case" ":J();return;default:return}})}function F(){window.requestAnimationFrame(F),T(),S()}g();F();})();
