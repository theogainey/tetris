"use strict";(()=>{function E(){let o=["I","J","L","O","S","T","Z"],e=Math.floor(Math.random()*o.length);return o[e]}function T(o){return o==="I"||o==="O"}function m(){let o=E();return{typeCurrent:o,xCurrent:T(o)?5:4.5,yCurrent:T(o)?-2:-1.5}}var C=30,d=48,s={I:{position1:[[-2,-1],[-1,-1],[0,-1],[1,-1]],position2:[[0,-2],[0,-1],[0,0],[0,1]]},J:{position1:[[-1.5,-1.5],[-1.5,-.5],[-.5,-.5],[.5,-.5]],position2:[[-.5,-1.5],[.5,-1.5],[-.5,-.5],[-.5,.5]],position3:[[-1.5,-.5],[-.5,-.5],[.5,-.5],[.5,.5]],position4:[[-.5,-1.5],[-.5,-.5],[-.5,.5],[-1.5,.5]]},L:{position1:[[-1.5,-.5],[-.5,-.5],[.5,-.5],[.5,-1.5]],position2:[[-.5,-1.5],[-.5,-.5],[-.5,.5],[.5,.5]],position3:[[-1.5,-.5],[-1.5,.5],[-.5,-.5],[.5,-.5]],position4:[[-1.5,-1.5],[-.5,-1.5],[-.5,-.5],[-.5,.5]]},O:{position1:[[-1,-1],[0,-1],[-1,0],[0,0]]},S:{position1:[[-1.5,-.5],[-.5,-.5],[-.5,-1.5],[.5,-1.5]],position2:[[-.5,-1.5],[-.5,-.5],[.5,-.5],[.5,.5]]},T:{position1:[[-1.5,-.5],[-.5,-.5],[-.5,-1.5],[.5,-.5]],position2:[[-.5,-1.5],[-.5,-.5],[.5,-.5],[-.5,.5]],position3:[[-1.5,-.5],[-.5,-.5],[.5,-.5],[-.5,.5]],position4:[[-1.5,-.5],[-.5,-1.5],[-.5,-.5],[-.5,.5]]},Z:{position1:[[-1.5,-1.5],[-.5,-1.5],[-.5,-.5],[.5,-.5]],position2:[[-.5,-.5],[-.5,.5],[.5,-.5],[.5,-1.5]]}},f={I:{color:"#6EECEE",offsets:[s.I.position1,s.I.position2]},J:{color:"#0000E6",offsets:[s.J.position1,s.J.position2,s.J.position3,s.J.position4]},L:{color:"#E4A439",offsets:[s.L.position1,s.L.position2,s.L.position3,s.L.position4]},O:{color:"#E3E34B",offsets:[s.O.position1]},S:{color:"#6EEC47",offsets:[s.S.position1,s.S.position2]},T:{color:"#921CE7",offsets:[s.T.position1,s.T.position2,s.T.position3,s.T.position4]},Z:{color:"#DC2F21",offsets:[s.Z.position1,s.Z.position2]}},y=document.getElementById("myCanvas"),t={...m(),rotation:0,framesTillDrop:d,lockedCells:[],lockDelayFrame:-1};function L(){let e=f[t.typeCurrent].offsets[t.rotation];return e.every(([n,i])=>i+t.yCurrent<19)?e.every(([n,i])=>t.lockedCells.filter(({xStart:r})=>r===n+t.xCurrent).every(({yStart:r})=>i+t.yCurrent+1!==r)):!1}function F(){let n=f[t.typeCurrent].offsets[t.rotation].map(([r,c])=>c+t.yCurrent),i=[...new Set(n)],l=[];i.forEach(r=>{t.lockedCells.filter(({yStart:p})=>p===r).length===10&&(t.lockedCells=t.lockedCells.filter(({yStart:p})=>p!==r),l.push(r))}),t.lockedCells=t.lockedCells.map(r=>{let c=l.filter(p=>p>r.yStart);return{...r,yStart:r.yStart+c.length}})}function h(){if(L()){if(t.framesTillDrop>0&&t.lockDelayFrame===-1){t.framesTillDrop=t.framesTillDrop-1;return}if(t.lockDelayFrame===-1){t.framesTillDrop=d,t.yCurrent=t.yCurrent+1;return}}if(t.lockDelayFrame===-1){t.lockDelayFrame=0;return}if(t.lockDelayFrame<30){t.lockDelayFrame++;return}t.lockDelayFrame=-1,f[t.typeCurrent].offsets[t.rotation].forEach(([e,n])=>{t.lockedCells.push({color:f[t.typeCurrent].color,xStart:t.xCurrent+e,yStart:t.yCurrent+n})}),F();let o=m();t.xCurrent=o.xCurrent,t.yCurrent=o.yCurrent,t.typeCurrent=o.typeCurrent,t.rotation=0}function w(o,e,n,i){let l=n*C,r=i*C;o.fillStyle=e,o.fillRect(l,r,C,C),o.strokeRect(l,r,C,C),o.shadowBlur=20,o.shadowColor="#323232",o.fillRect(l+5,r+5,C-10,C-10),o.shadowBlur=0}function R(o,e,n,i){e.offsets[t.rotation].forEach(([l,r])=>{w(o,e.color,n+l,i+r)})}function x(){let o=y.getContext("2d");o.clearRect(0,0,y.width,y.height),R(o,f[t.typeCurrent],t.xCurrent,t.yCurrent),t.lockedCells.forEach(({color:e,xStart:n,yStart:i})=>{w(o,e,n,i)})}function k(o){return b(o)&&O(o)}function O(o){if(o<0)return!1;let{offsets:e}=f[t.typeCurrent];return e[t.rotation].every(([i,l])=>t.lockedCells.filter(({xStart:c})=>c===o+i).every(({yStart:c})=>l+t.yCurrent!==c))}function b(o){return f[t.typeCurrent].offsets[t.rotation].every(([e])=>e+o<=9&&e+o>=0)}function I(){let{offsets:o}=f[t.typeCurrent],e=o[t.rotation].map(([a,u])=>u+t.yCurrent),n=o[t.rotation].map(([a,u])=>a+t.xCurrent),i=Math.max(...e),l=t.lockedCells.filter(({xStart:a,yStart:u})=>n.includes(a)&&u>i);if(l.length===0){let u=e.find(v=>v===i)-t.yCurrent;t.yCurrent=19-u;return}let r=Math.min(...l.map(({yStart:a})=>a)),c=l.find(({yStart:a})=>a===r),p=o[t.rotation].filter(([a,u])=>a+t.xCurrent===c.xStart),g=Math.max(...p.map(([a,u])=>u));t.yCurrent=r-1-g}function S(){window.addEventListener("keydown",o=>{switch(o.key){case"ArrowRight":k(t.xCurrent+1)&&(t.xCurrent=t.xCurrent+1);return;case"ArrowLeft":k(t.xCurrent-1)&&(t.xCurrent=t.xCurrent-1);return;case"ArrowUp":let e=t.rotation,n=t.rotation+1;n===f[t.typeCurrent].offsets.length&&(n=0),t.rotation=n,k(t.xCurrent)||(t.rotation=e);return;case"ArrowDown":t.framesTillDrop=t.framesTillDrop-48;return;case" ":I();return;default:return}})}function D(){window.requestAnimationFrame(D),h(),x()}S();D();})();
