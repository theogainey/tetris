"use strict";(()=>{function x(){let e=["I","J","L","O","S","T","Z"],r=Math.floor(Math.random()*e.length);return e[r]}function S(e){return e==="I"||e==="O"}function c(){let e=x();return{typeCurrent:e,xCurrent:S(e)?5*o:4.5*o,yCurrent:-2*o}}var o=30,w=48,i={I:{position1:[[-2*o,-o],[-o,-o],[0,-o],[o,-o]],position2:[[0,-2*o],[0,-o],[0,0],[0,o]]},J:{position1:[[-1.5*o,-1.5*o],[-1.5*o,-.5*o],[-.5*o,-.5*o],[.5*o,-.5*o]],position2:[[-.5*o,-1.5*o],[.5*o,-1.5*o],[-.5*o,-.5*o],[-.5*o,.5*o]],position3:[[-1.5*o,-.5*o],[-.5*o,-.5*o],[.5*o,-.5*o],[.5*o,.5*o]],position4:[[-.5*o,-1.5*o],[-.5*o,-.5*o],[-.5*o,.5*o],[-1.5*o,.5*o]]},L:{position1:[[-1.5*o,-.5*o],[-.5*o,-.5*o],[.5*o,-.5*o],[.5*o,-1.5*o]],position2:[[-.5*o,-1.5*o],[-.5*o,-.5*o],[-.5*o,.5*o],[.5*o,.5*o]],position3:[[-1.5*o,-.5*o],[-1.5*o,.5*o],[-.5*o,-.5*o],[.5*o,-.5*o]],position4:[[-1.5*o,-1.5*o],[-.5*o,-1.5*o],[-.5*o,-.5*o],[-.5*o,.5*o]]},O:{position1:[[-o,-o],[0,-o],[-o,0],[0,0]]},S:{position1:[[-1.5*o,-.5*o],[-.5*o,-.5*o],[-.5*o,-1.5*o],[.5*o,-1.5*o]],position2:[[-.5*o,-1.5*o],[-.5*o,-.5*o],[.5*o,-.5*o],[.5*o,.5*o]]},T:{position1:[[-1.5*o,-.5*o],[-.5*o,-.5*o],[-.5*o,-1.5*o],[.5*o,-.5*o]],position2:[[-.5*o,-1.5*o],[-.5*o,-.5*o],[.5*o,-.5*o],[-.5*o,.5*o]],position3:[[-1.5*o,-.5*o],[-.5*o,-.5*o],[.5*o,-.5*o],[-.5*o,.5*o]],position4:[[-1.5*o,-.5*o],[-.5*o,-1.5*o],[-.5*o,-.5*o],[-.5*o,.5*o]]},Z:{position1:[[-1.5*o,-1.5*o],[-.5*o,-1.5*o],[-.5*o,-.5*o],[.5*o,-.5*o]],position2:[[-.5*o,-.5*o],[-.5*o,.5*o],[.5*o,-.5*o],[.5*o,-1.5*o]]}},f={I:{color:"#6EECEE",offsets:[i.I.position1,i.I.position2]},J:{color:"#0000E6",offsets:[i.J.position1,i.J.position2,i.J.position3,i.J.position4]},L:{color:"#E4A439",offsets:[i.L.position1,i.L.position2,i.L.position3,i.L.position4]},O:{color:"#E3E34B",offsets:[i.O.position1]},S:{color:"#6EEC47",offsets:[i.S.position1,i.S.position2]},T:{color:"#921CE7",offsets:[i.T.position1,i.T.position2,i.T.position3,i.T.position4]},Z:{color:"#DC2F21",offsets:[i.Z.position1,i.Z.position2]}},p=document.getElementById("myCanvas"),t={...c(),rotation:0,dy:o/w,lockedCells:[],lockDelayFrame:-1};function g(){let r=f[t.typeCurrent].offsets[t.rotation];if(!r.every(([s,l])=>l+t.yCurrent+t.dy<=o*19))return!1;let n=r.map(([s])=>s+t.xCurrent);return t.lockedCells.filter(({xStart:s})=>n.includes(s)).every(({xStart:s,yStart:l})=>r.every(([a,h])=>!(s<a+t.xCurrent+o&&s+o>a+t.xCurrent&&l<h+t.yCurrent+t.dy+o&&o+l>h+t.yCurrent+t.dy)))}function v(){let n=f[t.typeCurrent].offsets[t.rotation].map(([l])=>l+t.yCurrent),s=[...new Set(n)].filter(l=>{if(t.lockedCells.filter(({yStart:a})=>a===l).length===10)return!0});if(s.length>0){let l=Math.min(...s);t.lockedCells=t.lockedCells.filter(({yStart:a})=>!s.includes(a)),t.lockedCells=t.lockedCells.map(a=>l>a.yStart?{...a,yStart:a.yStart+o*s.length}:a)}}function C(){if(g()){t.yCurrent=t.yCurrent+t.dy;return}if(t.lockDelayFrame===-1){t.lockDelayFrame=0;return}if(t.lockDelayFrame<30){t.lockDelayFrame++;return}t.lockDelayFrame=-1,f[t.typeCurrent].offsets[t.rotation].forEach(([r,n])=>{t.lockedCells.push({color:f[t.typeCurrent].color,xStart:t.xCurrent+r,yStart:t.yCurrent+n})}),v();let e=c();t.xCurrent=e.xCurrent,t.yCurrent=e.yCurrent,t.typeCurrent=e.typeCurrent,t.rotation=0}function k(e,r,n,u){e.fillStyle=r,e.fillRect(n,u,o,o),e.strokeRect(n,u,o,o),e.shadowBlur=20,e.shadowColor="#323232",e.fillRect(n+5,u+5,o-10,o-10),e.shadowBlur=0}function D(e,r,n,u){r.offsets[t.rotation].forEach(([s,l])=>{k(e,r.color,n+s,u+l)})}function m(){let e=p.getContext("2d");e.clearRect(0,0,p.width,p.height),D(e,f[t.typeCurrent],t.xCurrent,t.yCurrent),t.lockedCells.forEach(({color:r,xStart:n,yStart:u})=>{k(e,r,n,u)})}function d(e){return L(e)&&E(e)}function E(e){if(e<0)return!1;let{offsets:r}=f[t.typeCurrent];return t.lockedCells.every(({xStart:n,yStart:u})=>r[t.rotation].every(([s,l])=>!(n<s+e+o&&n+o>s+e&&u<l+t.yCurrent+o&&o+u>l+t.yCurrent)))}function L(e){return f[t.typeCurrent].offsets[t.rotation].every(([r])=>r+e+o<=o*10&&r+e>=0)}function y(){window.addEventListener("keydown",e=>{switch(e.key){case"ArrowRight":d(t.xCurrent+o)&&(t.xCurrent=t.xCurrent+o);return;case"ArrowLeft":d(t.xCurrent-o)&&(t.xCurrent=t.xCurrent-o);return;case"ArrowUp":let r=t.rotation,n=t.rotation+1;n===f[t.typeCurrent].offsets.length&&(n=0),t.rotation=n,d(t.xCurrent)||(t.rotation=r);return;default:return}})}function T(){window.requestAnimationFrame(T),C(),m()}y();T();})();
